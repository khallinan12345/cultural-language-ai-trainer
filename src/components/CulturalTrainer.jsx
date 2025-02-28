import React, { useState, useRef, useEffect } from 'react';
import './CulturalTrainer.css';
import gambianTraineeImage from '../assets/gambian-trainee.png';

const CulturalTrainer = () => {
  // State for chat messages and context
  const [clientMessages, setClientMessages] = useState([]);
  const [advisorMessages, setAdvisorMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentScenario, setCurrentScenario] = useState('react');
  const [conversationContext, setConversationContext] = useState({
    topic: 'react',
    stage: 'initial',
    previousMessages: []
  });
  
  const clientChatRef = useRef(null);
  const advisorChatRef = useRef(null);
  
  // Scenarios data with detailed context
  const scenarios = {
    'react': {
      intro: 'Hello! I need help with our React application. The navigation component is broken after the latest update.',
      details: "The specific issue is that when users click on any navigation link in the header, they get redirected to the homepage instead of the correct page. This started happening after we updated React Router from version 5 to version 6 yesterday. None of our routes seem to be matching properly anymore."
    },
    'angular': {
      intro: 'We\'re experiencing issues with our Angular application. The data binding seems to be inconsistent across different components.',
      details: "When users update information in one component, sometimes the changes don't reflect in other components that should be displaying the same data. It seems like our Observable subscriptions might not be working correctly, or perhaps we have an issue with change detection. This is happening specifically with our customer profile management screens."
    },
    'javascript': {
      intro: 'Our JavaScript code is failing when making API calls. I think there\'s an issue with promises.',
      details: "Our frontend is making API calls using fetch() with promises, but in production, the calls fail with 'Uncaught Promise' errors. The API endpoint works when tested directly, so it seems to be an issue with how we're handling the promises in our code. The errors specifically mention something about 'unhandled rejection'."
    },
    'python': {
      intro: 'The Python script for processing our CSV files is running extremely slow. Can you optimize it?',
      details: "Our Python script processes CSV files with customer data. It used to analyze 1,000 records in about 30 seconds, but now takes over 10 minutes with the same volume. We're particularly concerned about a loop that seems to be reading each row multiple times unnecessarily. The script uses pandas for data processing."
    },
    'dotnet': {
      intro: 'Our .NET API endpoints are returning 500 errors when handling concurrent requests.',
      details: "Our .NET API endpoints return 500 errors, but only when we have about 20+ simultaneous users. The logs show database connection timeout errors. We suspect it might be related to how we're managing our SQL connection pooling, but we're not sure how to properly configure it for high concurrency."
    },
    'n8n': {
      intro: 'We need help setting up an n8n workflow that integrates with our CRM system. The automation isn\'t working correctly.',
      details: "We're trying to create an n8n workflow that automatically creates tasks in our CRM when certain events happen. We've got the basic workflow set up, but we're having trouble with the conditional logic and data transformation. Specifically, we need the workflow to parse incoming webhook data, filter based on certain criteria, and then format the data correctly before sending it to our CRM API. The error logs show that the data isn't being transformed correctly."
    },
    'claude': {
      intro: 'We\'re implementing Claude 3.7 in our customer service portal, but we\'re having trouble with the prompt engineering.',
      details: "We've integrated Claude 3.7 into our customer service portal to help answer common questions, but the responses aren't as helpful as we'd like. We need help refining our prompts to get more consistent and accurate responses. We're particularly struggling with getting Claude to correctly extract and use information from our product database. The current prompts either produce overly verbose responses or miss key details from our knowledge base."
    }
  };
  
  // Function to initialize or reset a scenario
  const resetScenario = (scenarioKey) => {
    setCurrentScenario(scenarioKey);
    setClientMessages([{
      sender: 'US Client',
      content: scenarios[scenarioKey].intro
    }]);
    setAdvisorMessages([]);
    setConversationContext({
      topic: scenarioKey,
      stage: 'initial',
      previousMessages: []
    });
  };
  
  // Initialize with default scenario on first load
  useEffect(() => {
    resetScenario('react');
  }, []);
  
  // Scroll to bottom of chat windows when messages change
  useEffect(() => {
    if (clientChatRef.current) {
      clientChatRef.current.scrollTop = clientChatRef.current.scrollHeight;
    }
    
    if (advisorChatRef.current) {
      advisorChatRef.current.scrollTop = advisorChatRef.current.scrollHeight;
    }
  }, [clientMessages, advisorMessages]);
  
  // Function to evaluate trainee response
  const evaluateResponse = (response, lastClientMessage) => {
    // Enhanced evaluation logic with context awareness
    const lowercaseResponse = response.toLowerCase();
    const lowercaseClientMessage = lastClientMessage.toLowerCase();
    let feedback = '';
    
    // Check for response length
    if (response.length < 20) {
        feedback = `Your response: "${response}"\n\nSuggestion: Your response is too brief. In U.S. business culture, clients appreciate thorough answers that acknowledge their concerns. Try elaborating more and offering specific next steps.`;
        return feedback;
    }
    
    // Track positive aspects and improvement areas
    const positiveAspects = [];
    const improvementAreas = [];
    
    // Check for greeting (less important in follow-up messages)
    if (clientMessages.length <= 2 && !lowercaseResponse.includes('hello') && !lowercaseResponse.includes('hi')) {
        improvementAreas.push("Starting with a greeting (e.g., 'Hello' or 'Hi [Name]') establishes a professional but friendly tone in initial messages");
    } else {
        positiveAspects.push("Good conversation flow");
    }
    
    // Check for empathy/acknowledgment
    if (!lowercaseResponse.includes('understand') && !lowercaseResponse.includes('see') && 
        !lowercaseResponse.includes('sorry') && !lowercaseResponse.includes('let me') && 
        !lowercaseResponse.includes('i can')) {
        improvementAreas.push("Acknowledging the client's concerns shows empathy, which is valued in U.S. business communication");
    } else {
        positiveAspects.push("Good empathy and acknowledgment");
    }
    
    // Check for action-oriented language
    if (!lowercaseResponse.includes('can') && !lowercaseResponse.includes('will') && 
        !lowercaseResponse.includes('could') && !lowercaseResponse.includes('going to') && 
        !lowercaseResponse.includes('plan to')) {
        improvementAreas.push("Include action-oriented language that clearly states what you will do to address their concerns");
    } else {
        positiveAspects.push("Good action-oriented communication");
    }
    
    // Context-specific checks
    if (lowercaseClientMessage.includes('timeline') || lowercaseClientMessage.includes('when')) {
        if (!lowercaseResponse.includes('by') && !lowercaseResponse.includes('estimate') && 
            !lowercaseResponse.includes('hour') && !lowercaseResponse.includes('day') && 
            !lowercaseResponse.includes('week') && !lowercaseResponse.includes('time')) {
            improvementAreas.push("When asked about timelines, U.S. clients expect specific timeframes or estimates");
        } else {
            positiveAspects.push("Good time estimation");
        }
    }
    
    if (lowercaseClientMessage.includes('explain') || lowercaseClientMessage.includes('understand')) {
        if (!lowercaseResponse.includes('because') && !lowercaseResponse.includes('reason') && 
            !lowercaseResponse.includes('due to') && !lowercaseResponse.includes('caused by')) {
            improvementAreas.push("When explaining technical concepts, use simple cause-and-effect language that non-technical people can understand");
        } else {
            positiveAspects.push("Good explanation approach");
        }
    }
    
    if (lowercaseClientMessage.includes('share') || lowercaseClientMessage.includes('screen')) {
        if (!lowercaseResponse.includes('share') && !lowercaseResponse.includes('screen') && 
            !lowercaseResponse.includes('show') && !lowercaseResponse.includes('see')) {
            improvementAreas.push("When asked to share your screen, confirm that you're doing so and explain what they'll be seeing");
        } else {
            positiveAspects.push("Good response to screen sharing request");
        }
    }
    
    // Construct feedback
    if (improvementAreas.length === 0) {
        feedback = `Your response: "${response}"\n\nExcellent! Your communication was culturally appropriate and technically sound. I noticed:\n• ${positiveAspects.join('\n• ')}`;
    } else {
        feedback = `Your response: "${response}"\n\nSuggestion: Your response could be improved. Here's what you did well:\n• ${positiveAspects.join('\n• ')}\n\nAreas to improve:\n• ${improvementAreas.join('\n• ')}`;
    }
    
    return feedback;
  };

  // Function to get the last client message
  const getLastClientMessage = () => {
    // Filter for US Client messages and get the last one
    const clientMsgs = clientMessages.filter(msg => msg.sender === 'US Client');
    if (clientMsgs.length > 0) {
      return clientMsgs[clientMsgs.length - 1].content;
    }
    return '';
  };
  
  // Generate client response based on user input and conversation context
  const generateClientResponse = (userMessage) => {
    const lowercaseUserMessage = userMessage.toLowerCase();
    
    // Update conversation context
    setConversationContext(prevContext => ({
      ...prevContext,
      previousMessages: [...prevContext.previousMessages, userMessage],
      stage: prevContext.previousMessages.length > 4 ? 'middle' : 'initial'
    }));
    
    // Check if user is asking for more information or clarification
    if (lowercaseUserMessage.includes('detail') || 
        lowercaseUserMessage.includes('more info') || 
        lowercaseUserMessage.includes('unclear') ||
        lowercaseUserMessage.includes('can you explain') || 
        lowercaseUserMessage.includes('what exactly') ||
        lowercaseUserMessage.includes('better') && lowercaseUserMessage.includes('explain') ||
        lowercaseUserMessage.includes('cant help') && lowercaseUserMessage.includes('unclear')) {
        
        // Provide specific details based on the scenario
        return scenarios[currentScenario].details;
    }
    
    // If the user has asked about getting more help or involving others
    const lastClientMessage = getLastClientMessage().toLowerCase();
    if (lowercaseUserMessage.includes('yes') && 
       (lastClientMessage.includes('senior developer') || 
        lastClientMessage.includes('provide more context'))) {
        
        return "I'll get our senior developer Alex to join our next call. In the meantime, could you take a look at our codebase? I've just sent you access to our repository. The navigation component is in the src/components/Navigation directory.";
    }
    
    // If user message is too short or vague and not asking for clarification
    if ((userMessage.length < 15 || userMessage.split(' ').length < 3) && 
        !lowercaseUserMessage.includes('detail') && 
        !lowercaseUserMessage.includes('unclear')) {
        
        return "I need a bit more information from your side. What specific approach are you thinking of taking to solve this issue? We're really stuck and could use your expert guidance on the best way forward.";
    }
    
    // Response to screen sharing confirmations
    if ((lowercaseUserMessage.includes('screen') || lowercaseUserMessage.includes('sharing') || 
         lowercaseUserMessage.includes('show')) && 
        (lowercaseUserMessage.includes('now') || lowercaseUserMessage.includes('will') || 
         lowercaseUserMessage.includes('can') || lowercaseUserMessage.includes('sure'))) {
        
        return "Great, I can see your screen now. Could you navigate to the problem area? I notice the error appears in the console whenever we click a navigation link. Does that error message tell you anything specific about what might be causing it?";
    }
    
    // Response to timeline mentions
    if (lowercaseUserMessage.includes('hour') || lowercaseUserMessage.includes('day') || 
        lowercaseUserMessage.includes('week') || lowercaseUserMessage.includes('time') || 
        lowercaseUserMessage.includes('estimate')) {
        
        return "Thanks for giving me that timeline. That works with our schedule. Our priority is getting the navigation working again since users can't access key parts of the application. Would it help if I arranged a call with our product team so they understand the timeline as well?";
    }
    
    // Response to technical explanations
    if (lowercaseUserMessage.includes('because') || lowercaseUserMessage.includes('reason') || 
        lowercaseUserMessage.includes('issue is') || lowercaseUserMessage.includes('problem is') ||
        lowercaseUserMessage.includes('caused by')) {
        
        return "That explanation makes sense. I appreciate you breaking it down in a way I can understand. Based on what you're saying, should we consider rolling back to the previous version temporarily while you implement a proper fix? Our users are getting frustrated.";
    }
    
    // Response to suggested solutions
    if (lowercaseUserMessage.includes('suggest') || lowercaseUserMessage.includes('recommend') || 
        lowercaseUserMessage.includes('could try') || lowercaseUserMessage.includes('should') ||
        lowercaseUserMessage.includes('need to') || lowercaseUserMessage.includes('fix') ||
        lowercaseUserMessage.includes('solution')) {
        
        return "That approach sounds promising. How confident are you that this will resolve the issue? And will this solution be sustainable long-term, or should we be looking at a more comprehensive refactoring of that component?";
    }
    
    // Fallback responses based on conversation stage
    const conversationLength = clientMessages.length;
    
    // Early in conversation
    if (conversationLength < 4) {
        return "I understand you need more information. What specific details about the navigation component would help you diagnose the issue better? I can provide our repository access or error logs if that would help.";
    }
    // Middle of conversation
    else if (conversationLength < 7) {
        return "I appreciate your help with this. Our team has been stuck on this problem for a couple of days now. Do you think this is something that will require significant changes to fix, or could it be something relatively simple that we've overlooked?";
    }
    // Later in conversation
    else {
        return "Given everything we've discussed so far, what do you think is our best path forward? Our team is ready to implement your recommendations, but we want to make sure we're taking the right approach to prevent this from happening again.";
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userInput.trim() === '') return;
    
    // Add user message to chat
    const newClientMessages = [
      ...clientMessages,
      { sender: 'You', content: userInput }
    ];
    setClientMessages(newClientMessages);
    
    // Get the last client message for context
    const lastClientMessage = getLastClientMessage();
    
    // Generate cultural advisor feedback with context
    const advisorFeedback = evaluateResponse(userInput, lastClientMessage);
    setAdvisorMessages([...advisorMessages, { content: advisorFeedback }]);
    
    // Store user input before clearing
    const currentInput = userInput;
    
    // Clear input field immediately
    setUserInput('');
    
    // Generate contextual US client response
    setTimeout(() => {
      const clientResponse = generateClientResponse(currentInput);
      setClientMessages(prevMessages => [...prevMessages, { 
        sender: 'US Client', 
        content: clientResponse 
      }]);
    }, 1500);
  };
  
  // Handle key press (Enter to submit, Shift+Enter for new line)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Cultural and Language AI Trainer</h1>
      
      <div className="image-container">
        <img 
          src={gambianTraineeImage} 
          alt="Gambian trainee interacting with AI assistant" 
          className="header-image"
        />
      </div>
      
      <h2 className="instructions-title">Instructions</h2>
      <p className="instructions-text">
        This tool simulates conversations with US clients to help technology trainees improve their cultural and language fit. 
        Respond to the client messages as you would in a real situation. After each response, 
        the Cultural Assistant will provide feedback on your communication style and technical approach.
      </p>
      
      <div className="scenario-selector">
        <label htmlFor="scenario-select">Select scenario: </label>
        <select 
          id="scenario-select"
          value={currentScenario}
          onChange={(e) => setCurrentScenario(e.target.value)}
        >
          <option value="react">React Navigation Component Issue</option>
          <option value="javascript">JavaScript Async Function Problems</option>
          <option value="python">Python Data Processing Optimization</option>
          <option value="dotnet">.NET API Endpoint Errors</option>
        </select>
        <button 
          className="scenario-btn"
          onClick={() => resetScenario(currentScenario)}
        >
          New Scenario
        </button>
      </div>
      
      <div className="chat-container">
        {/* Client chat window */}
        <div className="chat-window">
          <div className="window-header">Chat with US Client</div>
          <div 
            ref={clientChatRef}
            className="chat-history"
          >
            {clientMessages.map((msg, index) => (
              <div key={index} className="chat-message">
                <span className="message-sender">{msg.sender}: </span>
                <span>{msg.content}</span>
              </div>
            ))}
          </div>
          
          <form onSubmit={handleSubmit}>
            <textarea
              className="user-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your response here..."
            />
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
        
        {/* Cultural advisor window */}
        <div className="advisor-window">
          <div className="window-header">Cultural Assistant Suggestions</div>
          <div
            ref={advisorChatRef}
            className="chat-history"
          >
            {advisorMessages.map((msg, index) => (
              <div key={index} className="advisor-feedback">
                {msg.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalTrainer;