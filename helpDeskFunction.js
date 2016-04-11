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
    case "Adali":
    case "Adalis":
    case "Tulay Adali":
    case "Tulay Adalis":
    speechOutput = "Dr. Adalis office is in I.T.E. 324";
    break;

    case "Aina":
    case "Ainas":
    case "Yemisi Aina":
    case "Yemisi Ainas":
    speechOutput = "Yemisi Ainas office is in I.T.E. 325E";
    break;

    case "Banerjee":
    case "Banerjees":
    case "Nilanjan Banerjee":
    case "Nilanjan Banerjees":
    speechOutput = "Dr. Banerjees office is in I.T.E. 362";
    break;

    case "Bargteil":
    case "Bargteils":
    case "Adam Bargteil":
    case "Adam Bargteils":
    speechOutput = "Dr. Bargteils office is in I.T.E. 341";
    break;

    case "Carter":
    case "Carters":
    case "Gary Carter":
    case "Gary Carters":
    speechOutput = "Dr. Carters office is in I.T.E. 308";
    break;

    case "Chein-i Chang":
    case "Chein-i Changs":
    speechOutput = "Dr. Chein-i Changs office is in I.T.E. 310";
    break;

    case "Chang":
    case "Changs":
    case "Richard Chang":
    case "Richard Changs":
    speechOutput = "Dr. Richard Changs office is in I.T.E. 326";
    break;

    case "Chen":
    case "Chens":
    case "Jian Chen":
    case "Jian Chens":
    speechOutput = "Dr. Chens office is in I.T.E. 357";
    break;

    case "Chester":
    case "Chesters":
    case "Bob Chester":
    case "Bob Chesters":
    speechOutput = "Bob Chesters office is in I.T.E. 325M";
    break;

    case "Choa":
    case "Choas":
    case "Fow-Sen Choa":
    case "Fow-Sen Choas":
    speechOutput = "Dr. Choas office is in I.T.E. 303";
    break;

    case "Desjardins":
    case "Marie Desjardinses":
    case "Marie Desjardins":
    case "Marie Desjardinses":
    speechOutput = "Dr. Desjardinses office is in I.T.E. 337";
    break;

    case "Douglass":
    case "Douglasses":
    case "Vera Douglass":
    case "Vera Douglasses":
    speechOutput = "Professor Douglasses office is in I.T.E. 325K";
    break;

    case "Drummey":
    case "Drummeys":
    case "Dee Ann Drummey":
    case "Dee Ann Drummeys":
    speechOutput = "Dee Ann Drummeys office is in I.T.E. 325L";
    break;

    case "Finin":
    case "Finins":
    case "Tim Finin":
    case "Tim Finins":
    speechOutput = "Dr. Finins office is in I.T.E. 329";
    break;

    case "Fliggins":
    case "Fligginses":
    case "Keara Fliggins":
    case "Keara Fligginses":
    speechOutput = "Keara Fligginses office is in I.T.E. 325I";
    break;

    case "Forno":
    case "Fornos":
    case "Richard Forno":
    case "Richard Fornos":
    speechOutput = "Dr. Fornos office is in I.T.E. 325A";
    break;

    case "Halem":
    case "Halems":
    case "Milton Halem":
    case "Milton Halems":
    speechOutput = "Dr. Halems office is in I.T.E. 330";
    break;

    case "Hyman-Waters":
    case "Hyman-Waterses":
    case "Camilla Hyman-Waters":
    case "Camilla Hyman-Waterses":
    speechOutput = "Camilla Hyman-Waterses office is in I.T.E. 325J";
    break;

    case "Joshi":
    case "Joshis":
    case "Anupam Joshi":
    case "Anupam Joshis":
    speechOutput = "Dr. Anupam Joshis office is in I.T.E. 328 and 325G";
    break;

    case "Karuna Joshi":
    case "Karuna Joshis":
    speechOutput = "Dr. Karuna Joshis office is in I.T.E. 372";
    break;

    case "Kim":
    case "Kims":
    case "Seung-Jun Kim":
    case "Seung-Jun Kims":
    speechOutput = "Professor Kims office is in I.T.E. 312";
    break;

    case "Kalpakis":
    case "Kalpakises":
    case "Kostas Kalpakis":
    case "Kostas Kalpakises":
    speechOutput = "Dr. Kalpakises office is in I.T.E. 348";
    break;

    case "Laberge":
    case "Laberges":
    case "Charles Laberge":
    case "Charles Laberges":
    speechOutput = "Dr. Laberges office is in I.T.E. 358";
    break;

    case "Lomonaco":
    case "Lomonacos":
    case "Sam Lomonaco":
    case "Sam Lomonacos":
	speechOutput = "Dr. Lomonacos office is in I.T.E. 306";
	break;
            
    case "Lupoli":
    case "Lupolis":
    case "Shawn Lupoli":
    case "Shawn Lupolis":
    speechOutput = "Professor Lupolis office is in I.T.E. 209";
    break;

    case "Marron":
    case "Marrons":
    case "Chris Marron":
    case "Chris Marrons":
    speechOutput = "Dr. Marrons office is in I.T.E. 359";
    break;

    case "Matuszek":
    case "Matuszeks":
    case "Cynthia Matuszek":
    case "Cynthia Matuszeks":
    case "M":
    speechOutput = "Dr. Matuszeks office is in I.T.E. 331";
    break;

    case "Menyuk":
    case "Menyuks":
    case "Curtis Menyuk":
    case "Curtis Menyuks":
    speechOutput = "Dr. Menyuks office is in I.T.E. 304";
    break;

    case "Mitchell":
    case "Mitchells":
    case "Susan Mitchell":
    case "Susan Mitchells":
    speechOutput = "Professor Mitchells office is in I.T.E. 214";
    break;

    case "Mohsenin":
    case "Mohsenins":
    case "Tinoosh Mohsenin":
    case "Tinoosh Mohsenins":
    speechOutput = "Dr. Menyuks office is in I.T.E. 323";
    break;

    case "Morawski":
    case "Morawskis":
    case "Maksym Morawski":
    case "Maksym Morawskis":
    case "Max":
    case "Maxes":
    case "Max Morawski":
    case "Max Morawskis":
    speechOutput = "Maxes office is in I.T.E. 215";
    break;

    case "Morris":
    case "Morrises":
    case "Joel Morris":
    case "Joel Morrises":
    speechOutput = "Dr. Morrises office is in I.T.E. 308";
    break;

    case "Nicholas":
    case "Nicholases":
    case "Charles Nicholas":
    case "Charles Nicholases":
    speechOutput = "Dr. Nicholases office is in I.T.E. 356";
    break;

    case "Oates":
    case "Oateses":
    case "Tim Oates":
    case "Tim Oateses":
    speechOutput = "Dr. Oateses office is in I.T.E. 336";
    break;

    case "Olano":
    case "Olanos":
    case "Marc Olano":
    case "Marc Olanos":
    speechOutput = "Dr. Olanos office is in I.T.E. 354";
    break;

    case "Park":
    case "Parks":
    case "John Park":
    case "John Parks":
    speechOutput = "Professor Parks office is in I.T.E. 207";
    break;

    case "Patel":
    case "Patels":
    case "Chintan Patel":
    case "Chintan Patels":
    speechOutput = "Dr. Patels office is in I.T.E. 322";
    break;

    case "Pearce":
    case "Pearces":
    case "Claudia Pearce":
    case "Claudia Pearces":
    speechOutput = "Professor Pearces office is in I.T.E. 373";
    break;

    case "Peng":
    case "Pengs":
    case "Yun Peng":
    case "Yun Pengs":
    speechOutput = "Dr. Pengs office is in I.T.E. 327";
    break;

    case "Phatak":
    case "Phataks":
    case "Dhananjay Phatak":
    case "Dhananjay Phataks":
    speechOutput = "Dr. Phataks office is in I.T.E. 319";
    break;

    case "Pinkston":
    case "Pinkstons":
    case "John Pinkston":
    case "John Pinkstons":
    speechOutput = "Dr. Pinkstons office is in I.T.E. 327";
    break;

    case "Pirsiavash":
    case "Pirsiavashes":
    case "Hamed Pirsiavash":
    case "Hamed Pirsiavashes":
    speechOutput = "Dr. Pirsiavashes office is in I.T.E. 342";
    break;

    case "Rheingans":
    case "Rheinganses":
    case "Penny Rheingans":
    case "Penny Rheinganses":
    speechOutput = "Dr. Rheinganses office is in I.T.E. 355";
    break;

    case "Robucci":
    case "Robuccis":
    case "Ryan Robucci":
    case "Ryan Robuccis":
    speechOutput = "Dr. Robuccis office is in I.T.E. 316";
    break;

    case "Sadeghian":
    case "Sadeghians":
    case "Pedram Sadeghian":
    case "Pedram Sadeghians":
    speechOutput = "Professor Sadeghians office is in I.T.E. 208";
    break;

    case "Schmill":
    case "Schmills":
    case "Matthew Schmill":
    case "Matthew Schmills":
    speechOutput = "Professor Schmills office is in I.T.E. 350";
    break;

    case "Sherman":
    case "Shermans":
    case "Alan Sherman":
    case "Alan Shermans":
    speechOutput = "Dr. Shermans office is in I.T.E. 224";
    break;

    case "Sidhu":
    case "Sidhus":
    case "Deepinder Sidhu":
    case "Deepinder Sidhus":
    speechOutput = "Dr. Sidhus office is in I.T.E. 347";
    break;

    case "Slaughter":
    case "Slaughters":
    case "Gymama Slaughter":
    case "Gymama Slaughters":
    speechOutput = "Dr. Slaughters office is in I.T.E. 311";
    break;

    case "Syed":
    case "Syeds":
    case "Zareen Syed":
    case "Zareen Syeds":
	speechOutput = "Professor Syeds office is in I.T.E. 301";
	break;

    case "Weiss":
    case "Weisses":
    case "Geoff Weiss":
    case "Geoff Weisses":
    speechOutput = "Geoff Weisses office is in I.T.E. 302";
    break;

    case "Wolfe":
    case "Wolfes":
    case "Olivia Wolfe":
    case "Olivia Wolfes":
    speechOutput = "Olivia Wolfes office is in I.T.E. 325F";
    break;

    case "Yan":
    case "Yans":
    case "Li Yan":
    case "Li Yans":
    speechOutput = "Dr. Yans office is in I.T.E. 315";
    break;

    case "Yesha":
    case "Yeshas":
    case "Yaacov Yesha":
    case "Yaacov Yeshas":
    speechOutput = "Dr. Yaacov Yeshas office is in I.T.E. 333";
    break;

    case "Yelena Yesha":
    case "Yelena Yeshas":
    speechOutput = "Dr. Yelena Yeshas office is in I.T.E. 335";
    break;

    case "Younis":
    case "Younises":
    case "Mohamed Younis":
    case "Mohamed Younises":
    speechOutput = "Dr. Younises office is in I.T.E. 318";
    break;

    case "Zhu":
    case "Zhus":
    case "Ting Zhu":
    case "Ting Zhus":
    speechOutput = "Dr. Zhus office is in I.T.E. 360";
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
    speechOutput = "You will need to request permission. Google CMSC UMBC Student Forms" +
    "and fill out the form called, Permission to Enroll in a Closed Course.";
    break;

    case "contact a professor":
    speechOutput = "The best way to reach them is by e-mail. Use the university" +
    "directory at umbc.edu/search/directory";
    break;

    case "complain about a class":
    case "complain about an instructor":
    case "complain":
    case "complaint about a class":
    case "complaint about an instructor":
    case "complaint":
    speechOutput = "First speak directly to your instructor. If you cannot come to an" +
    "agreement, then contact the undergraduate program director for the course";
    break;

    case "my student bill":
    case "my bill":
    case "billing":
    speechOutput = "You must go to Student Business Services on the third floor of" +
    "the Administration Building.";
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