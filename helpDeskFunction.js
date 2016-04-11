/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills Kit.
 * The Intent Schema, Custom Slots, and Sample Utterances for this skill, as well as
 * testing instructions are located at http://amzn.to/1LzFrj6
 *
 * For additional samples, visit the Alexa Skills Kit Getting Started guide at
 * http://amzn.to/1LGWsLG
 */

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);

        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        /*
        if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.[unique-value-here]") {
             context.fail("Invalid Application ID");
        }
        */

        if (event.session.new) {
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }

        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
		     event.session,
		     function callback(sessionAttributes, speechletResponse) {
			 context.succeed(buildResponse(sessionAttributes, speechletResponse));
		     });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
		     event.session,
		     function callback(sessionAttributes, speechletResponse) {
			 context.succeed(buildResponse(sessionAttributes, speechletResponse));
		     });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId +
		", sessionId=" + session.sessionId);
}

/**
 * Called when the user launches the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId +
		", sessionId=" + session.sessionId);

    // Dispatch to your skill's launch.
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId +
		", sessionId=" + session.sessionId);

    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;

    // Dispatch to your skill's intent handlers
    if ("OfficeHours" == intentName) {
        getOfficeHours(intent, session, callback);
    }
    else if ("OfficeLocation" == intentName) {
        getOfficeLocation(intent, session, callback);
    }
    else if("AskQuestion" == intentName){
        getAnswer(intent, session, callback);
    }
    else if ("AMAZON.HelpIntent" === intentName) {
        getWelcomeResponse(callback);
    } 
    else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId +
		", sessionId=" + session.sessionId);
    // Add cleanup logic here
}

// --------------- Functions that control the skill's behavior -----------------------

function getWelcomeResponse(callback) {
    // If we wanted to initialize the session to have some attributes we could add those here.
    var sessionAttributes = {};
    var cardTitle = "Welcome";
    var speechOutput = "Welcome to the Alexa help desk. " +
        "Please ask me a question such as, what are my professor's office hours";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Please ask me, what are my professor's office hours";
    var shouldEndSession = false;

    callback(sessionAttributes,
	     buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getOfficeHours(intent, session, callback) {
    var cardTitle = intent.name;
    var professorNameSlot = intent.slots.Professor;
    var repromptText = "I'm not sure which professor you said. Please try again";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";
    
    switch(professorNameSlot.value){
    case "Lupoli":
    case "Lupolis":
    case "Shawn Lupoli":
	speechOutput = "Professor Lupolis office hours are. monday and wednesday from 2 to 3 pm";
	break;
            
    case "Sherman":
    case "Shermans":
    case "Alan Sherman":
	speechOutput = "Professor Shermans office hours are. tuesday and thursday from 10 to 11 am";
	break;
            
    default:
	speechOutput = "I'm not sure which professor you said. Please try again";
	break;
    }

    callback(sessionAttributes,
	     buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getOfficeLocation(intent, session, callback) {
    var cardTitle = intent.name;
    var professorNameSlot = intent.slots.Professor;
    var repromptText = "I'm not sure which professor you said. Please try again";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";
    
    switch(professorNameSlot.value){
    case "Lupoli":
    case "Lupolis":
    case "Shawn Lupoli":
	speechOutput = "Professor Lupolis office is in I.T.E. 213";
	break;
            
    case "Sherman":
    case "Shermans":
    case "Alan Sherman":
	speechOutput = "Professor Shermans office is in I.T.E. 34";
	break;
            
    default:
	speechOutput = "I'm not sure which professor you said. Please try again";
	break;
    }

    callback(sessionAttributes,
	     buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getAnswer(intent, session, callback) {
    var cardTitle = intent.name;
    var questionNameSlot = intent.slots.Question;
    var repromptText = "I did not understand your question.";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";
    
    switch(questionNameSlot.value){
    case "advising office":
    speechOutput = "The advising office is in I.T.E. 202-206";
    break;

    case "my advisor":
    speechOutput = "The advising office can tell you who your advisor is.";
    break;

    case "card access":
    case "card swipe access":
    speechOutput = "Email Olivia Wolfe at OWolfe@umbc.edu. Make sure you C.C. your" +
    "instructor or faculty member.";
    break;

    case "register for a class that is full":
    case "register for a full class":
    speechOutput = "You will need to request permission. Google CMSC UMBC Student Forms and fill out the form called, Permission to Enroll in a Closed Course.";
    break;

    case "complain about a class":
    case "complain about an instructor":
    case "complain":
    case "complaint about a class":
    case "complaint about an instructor":
    case "complaint":
    speechOutput = "First speak directly to your instructor. If you cannot come to an agreement, then contact the undergraduate program director for the course";
    break;

    case "permission for a class":
    case "permission to enroll":
    speechOutput = "Email Dr. Richard Chang at chang@umbc.edu.";
    break;

    default:
    speechOutput = repromptText;
    break;
    }

    callback(sessionAttributes,
         buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

// --------------- Helpers that build all of the responses -----------------------

function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
		text: output
		},
	    card: {
            type: "Simple",
		title: "SessionSpeechlet - " + title,
		content: "SessionSpeechlet - " + output
		},
	    reprompt: {
            outputSpeech: {
                type: "PlainText",
		    text: repromptText
		    }
        },
	    shouldEndSession: shouldEndSession
	    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
	    sessionAttributes: sessionAttributes,
	    response: speechletResponse
	    };
}