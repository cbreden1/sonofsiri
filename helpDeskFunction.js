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
    if ("OfficeInfo" == intentName) {
        getOfficeInfo(intent, session, callback);
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
    var speechOutput = "Please ask me a question such as, what are professor X's office hours";
    // If the user either does not reply to the welcome message or says something that is not
    // understood, they will be prompted again with this text.
    var repromptText = "Please ask a question.";
    var shouldEndSession = false;

    callback(sessionAttributes,
	     buildSpeechletResponse(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getOfficeInfo(intent, session, callback) {
    var cardTitle = intent.name;
    var professorNameSlot = intent.slots.Professor;
    var repromptText = "I didn't understand your professor's name, please try again."; // If we made it here and it fails, prof is what's wrong
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";

    // Strip professor name of non-alphabetic characters
    var strippedName = professorNameSlot.value.replace( /[^a-zA-Z]/, "");
    var lowercaseName = strippedName.toLowerCase();
    
    switch(lowercaseName){
    case "adali":
    case "adalis":
    case "tulayadali":
    case "tulayadalis":
    speechOutput = "Dr. Adalis office is in I.T.E. 324," + 
    "Office hours are, tuesday 515-615pm.";
    break;

    case "aina":
    case "ainas":
    case "yemisiaina":
    case "yemisiainas":
    speechOutput = "Yemisi Ainas office is in I.T.E. 325 E, but has no office hours on file.";
    break;

    case "banerjee":
    case "banerjees":
    case "nilanjanbanerjee":
    case "nilanjanbanerjees":
    speechOutput = "Dr. Banerjees office is in I.T.E. 362, but has no office hours on file.";
    break;

    case "bargteil":
    case "bargteils":
    case "adambargteil":
    case "adambargteils":
    speechOutput = "Dr. Bargteils office is in I.T.E. 341," + 
    "Office hours are, monday 230-430pm.";
    break;

    case "birrane":
    case "birranes":
    case "edbirrane":
    case "edbirranes":
    case "edwardbirrane":
    case "edwardbirranes":
    speechOutput = "Edward Birranes office hours are, monday 430-530pm, in I.T.E. 211.";
    break;

    case "buck":
    case "bucks":
    case "hollybuck":
    case "hollybucks":
    speechOutput = "Holly Buck has no office or office hours on file.";
    break;

    case "cain":
    case "cains":
    case "russcain":
    case "russcains":
    speechOutput = "Russ Cain has no office or office hours on file.";
    break;

    case "carter":
    case "carters":
    case "garycarter":
    case "garycarters":
    speechOutput = "Dr. Carters office is in I.T.E. 308, but has no office hours on file.";
    break;

    case "cheinichang":
    case "cheinichangs":
    speechOutput = "Dr. Chein-i Changs office is in I.T.E. 310," +
    "Office hours are, monday and wednesday 3-4pm";
    break;

    case "chang":
    case "changs":
    case "richardchang":
    case "richardchangs":
    speechOutput = "Dr. Richard Changs office is in I.T.E. 326, but has no office hours on file.";
    break;

    case "chen":
    case "chens":
    case "jianchen":
    case "jianchens":
    speechOutput = "Dr. Chens office is in I.T.E. 357," +
    "Office hours are, monday and wednesday 1:20-2:20pm.";
    break;

    case "chester":
    case "chesters":
    case "bobchester":
    case "bobchesters":
    speechOutput = "Bob Chesters office is in I.T.E. 325M, but has no office hours on file";
    break;

    case "choa":
    case "choas":
    case "fowsenchoa":
    case "fowsenchoas":
    speechOutput = "Dr. Choas office is in I.T.E. 303, but has no office hours on file";
    break;

    case "daguanno":
    case "daguannos":
    case "giuseppedaguanno":
    case "giuseppedaguannos":
    speechOutput = "Dr. D'Aguannos office hours are, tuesday and thursday" + 
    "1-3pm in T.R.C. building, room 201B."
    break;

    case "desjardins":
    case "desjardinses":
    case "mariedesjardins":
    case "mariedesjardinses":
    speechOutput = "Dr. Desjardinses office is in I.T.E. 337," +
    "Office hours are, tuesday 10-11am in the library lobby cafe," +
    "and, thursday 4-5pm in I.T.E. 217.A.";
    break;

    case "dixon":
    case "dixons":
    case "jeremydixon":
    case "jeremydixons":
    speechOutput = "Jeremy Dixons office hours are, 10am to noon, but his office location is unlisted";
    break;

    case "dorband":
    case "dorbands":
    case "johndorband":
    case "johndorbands":
    speechOutput = "Dr. Dorband has no office or office hours on file.";
    break;

    case "douglass":
    case "douglasses":
    case "veradouglass":
    case "veradouglasses":
    speechOutput = "Professor Douglasses office is in I.T.E. 325K, but has no office hours on file.";
    break;

    case "drummey":
    case "drummeys":
    case "deeanndrummey":
    case "deeanndrummeys":
    speechOutput = "Dee Ann Drummeys office is in I.T.E. 325L, but has no office hours on file.";
    break;

    case "finin":
    case "finins":
    case "timfinin":
    case "timfinins":
    speechOutput = "Dr. Finins office is in I.T.E. 329, but has no office hours on file.";
    break;

    case "fliggins":
    case "fligginses":
    case "kearafliggins":
    case "kearafligginses":
    speechOutput = "Keara Fligginses office is in I.T.E. 325I, but has no office hours on file.";
    break;

    case "forno":
    case "fornos":
    case "richardforno":
    case "richardfornos":
    speechOutput = "Dr. Fornos office is in I.T.E. 325A, but has no office hours on file.";
    break;

    case "gartner":
    case "gartners":
    case "douggartner":
    case "douggartners":
    speechOutput = "Doug Gartners office hours are, tuesday and thursday 7-8pm in I.T.E. 201F.";
    break;

    case "gibson":
    case "gibsons":
    case "katiegibson":
    case "katiegibsons":
    speechOutput = "Dr. Gibsons office hours are, monday and thursday 10am to noon.";
    break;

    case "halem":
    case "halems":
    case "miltonhalem":
    case "miltonhalems":
    speechOutput = "Dr. Halems office is in I.T.E. 330, but has no office hours on file.";
    break;

    case "heiss":
    case "heisses":
    case "paulheiss":
    case "paulheisses":
    speechOutput = "Paul Heisses office hours are, tuesday and thursday 7-8pm in I.T.E. 374.";
    break;

    case "hirsch":
    case "hirsches":
    case "katiehirsch":
    case "katiehirsches":
    speechOutput = "Katie Hirsch has no office or office hours on file.";
    break;

    case "hymanwaters":
    case "hymanwaterses":
    case "camillahymanwaters":
    case "camillahymanwaterses":
    speechOutput = "Camilla Hyman-Waterses office is in I.T.E. 325J, but has no office hours on file.";
    break;

    case "johnson":
    case "johnsons":
    case "anthonyjohnson":
    case "anthonyjohnsons":
    speechOutput = "Anthony Johnsons office hours are, tuesday and thursday" + 
    "1:30-2:30pm in T.R.C. 029.";
    break;

    case "joshi":
    case "joshis":
    case "anupamjoshi":
    case "anupamjoshis":
    speechOutput = "Dr. Anupam Joshis office is in I.T.E. 328 and 325G, but has no office hours on file.";
    break;

    case "karunajoshi":
    case "karunajoshis":
    speechOutput = "Dr. Karuna Joshis office is in I.T.E. 372, but has no office hours on file";
    break;

    case "kalpakis":
    case "kalpakises":
    case "kostaskalpakis":
    case "kostaskalpakises":
    speechOutput = "Dr. Kalpakises office is in I.T.E. 348, but has no office hours on file";
    break;

    case "kashyap":
    case "kashyaps":
    case "abhaykashyap":
    case "abhaykashyaps":
    speechOutput = "Abhay Kashyap has no office or office hours on file.";
    break;

    case "kim":
    case "kims":
    case "seungjunkim":
    case "seungjunkims":
    speechOutput = "Professor Kims office is in I.T.E. 312," +
    "Office hours are, wednesday 5:15-6:15pm for Comp E. 320";
    break;

    case "kukla":
    case "kuklas":
    case "jimkukla":
    case "jimkuklas":
    speechOutput = "Jim Kuklas office hours are, monday 7-8pm, but has no office location on file";
    break;

    case "laberge":
    case "laberges":
    case "charleslaberge":
    case "charleslaberges":
    speechOutput = "Dr. Laberges office is in I.T.E. 358," +
    "Office hours are, monday and wednesday 1-3:30pm," +
    "and tuesday and thursday 2:30-3:30pm."
    ;
    break;

    case "lomonaco":
    case "lomonacos":
    case "samlomonaco":
    case "samlomonacos":
	speechOutput = "Dr. Lomonacos office is in I.T.E. 306," +
    "Office hours are, tuesday and wednesday 2:15-2:45pm, and, 5:15-5:45pm";
	break;
            
    case "lupoli":
    case "lupolis":
    case "shawnlupoli":
    case "shawnlupolis":
    speechOutput = "Professor Lupoli's office is in I.T.E. 209," +
    "Office hours are, tuesday 1:30-2:30pm, wednesday 10:30am-noon," +
    "and, thursday 10-11:30am";
    break;

    case "marron":
    case "marrons":
    case "chrismarron":
    case "chrismarrons":
    speechOutput = "Dr. Marrons office is in I.T.E. 359," +
    "Office hours are, tuesday 1-2pm, and, thursday 11:30am-12:30";
    break;

    case "maselko":
    case "maselkos":
    case "danmaselko":
    case "danmaselkos":
    speechOutput = "Dan Maselkos office hours are, monday and wednesday 7-8pm, but has no office location on file";
    break;

    case "matuszek":
    case "matuszeks":
    case "cynthiamatuszek":
    case "cynthiamatuszeks":
    case "m":
    speechOutput = "Dr. Matuszeks office is in I.T.E. 331," +
    "Office hours are, monday 9-10am, and, tuesday 10-11am";
    break;

    case "menyuk":
    case "menyuks":
    case "curtismenyuk":
    case "curtismenyuks":
    speechOutput = "Dr. Menyuks office is in I.T.E. 304, but has no office hours on file";
    break;

    case "mitchell":
    case "mitchells":
    case "susanmitchell":
    case "susanmitchells":
    speechOutput = "Professor Mitchells office is in I.T.E. 214, but has no office hours on file";
    break;

    case "mohsenin":
    case "mohsenins":
    case "tinooshmohsenin":
    case "tinooshmohsenins":
    speechOutput = "Dr. Menyuks office is in I.T.E. 323, but has no office hours on file";
    break;

    case "morawski":
    case "morawskis":
    case "maksymmorawski":
    case "maksymmorawskis":
    case "max":
    case "maxes":
    case "maxmorawski":
    case "maxmorawskis":
    speechOutput = "Max Morawskis office is in I.T.E. 215, but has no office hours on file";
    break;

    case "morris":
    case "morrises":
    case "joelmorris":
    case "joelmorrises":
    speechOutput = "Dr. Morrises office is in I.T.E. 308, but has no office hours on file";
    break;

    case "nicholas":
    case "nicholases":
    case "charlesnicholas":
    case "charlesnicholases":
    speechOutput = "Dr. Nicholases office is in I.T.E. 356," +
    "Office hours are, tuesday and thursday 2-3pm";
    break;

    case "novey":
    case "noveys":
    case "mikenovey":
    case "mikenoveys":
    case "michaelnovey":
    case "michaelnoveys":
    speechOutput = "Michael Novey has no office or office hours on file.";
    break;

    case "oates":
    case "oateses":
    case "timoates":
    case "timoateses":
    speechOutput = "Dr. Oates is office is in I.T.E. 336, but has no office hours on file";
    break;

    case "olano":
    case "olanos":
    case "marcolano":
    case "marcolanos":
    speechOutput = "Dr. Olanos office is in I.T.E. 354," +
    "Office hours are, tuesday and thursday 4-5pm";
    break;

    case "park":
    case "parks":
    case "johnpark":
    case "johnparks":
    speechOutput = "Professor Parks office is in I.T.E. 207," +
    "Office hours are, tuesday 4-5pm, and, wednesday 2-3 pm";
    break;

    case "patel":
    case "patels":
    case "chintanpatel":
    case "chintanpatels":
    speechOutput = "Dr. Patels office is in I.T.E. 322, but has no office hours on file";
    break;

    case "pearce":
    case "pearces":
    case "claudiapearce":
    case "claudiapearces":
    speechOutput = "Professor Pearces office is in I.T.E. 373, but has no office hours on file";
    break;

    case "peng":
    case "pengs":
    case "yunpeng":
    case "yunpengs":
    speechOutput = "Dr. Pengs office is in I.T.E. 327, but has no office hours on file.";
    break;

    case "perry":
    case "perrys":
    case "alexanderperry":
    case "alexanderperrys":
    speechOutput = "Alexander Perrys office hours are, monday and wednesday 6:45-7:45pm.";
    break;

    case "phatak":
    case "phataks":
    case "dhananjayphatak":
    case "dhananjayphataks":
    speechOutput = "Dr. Phataks office is in I.T.E. 319," +
    "Office hours are, tuesday 11am to 1, and, 4-6pm for C.M.S.C. 203.";
    break;

    case "pinkston":
    case "pinkstons":
    case "johnpinkston":
    case "johnpinkstons":
    speechOutput = "Dr. Pinkstons office is in I.T.E. 327, but has no office hours on file.";
    break;

    case "pirsiavash":
    case "pirsiavashes":
    case "hamedpirsiavash":
    case "hamedpirsiavashes":
    speechOutput = "Dr. Pirsiavashes office is in I.T.E. 342," +
    "Office hours are, tuesday 2:15-3:15pm";
    break;

    case "ray":
    case "rays":
    case "georgeray":
    case "georgerays":
    speechOutput = "George Rays office hours are, monday and wednesday 4:55-5:25pm in I.T.E. 374.";
    break;

    case "rheingans":
    case "rheinganses":
    case "rennyrheingans":
    case "pennyrheinganses":
    speechOutput = "Dr. Rheinganses office is in I.T.E. 355, but has no office hours on file.";
    break;

    case "robucci":
    case "robuccis":
    case "ryanrobucci":
    case "ryanrobuccis":
    speechOutput = "Dr. Robuccis office is in I.T.E. 316, but has no office hours on file.";
    break;

    case "sadeghian":
    case "sadeghians":
    case "pedramsadeghian":
    case "pedramsadeghians":
    speechOutput = "Professor Sadeghians office is in I.T.E. 208, but has no office hours on file.";
    break;

    case "schmill":
    case "schmills":
    case "matthewschmill":
    case "matthewschmills":
    speechOutput = "Professor Schmills office is in I.T.E. 350, but has no office hours on file.";
    break;

    case "sebald":
    case "sebalds":
    case "lawrencesebald":
    case "lawrencesebalds":
    speechOutput = "Lawrence Sebalds office hours are, tuesday and thursday 12:45-1:45pm. but has no office location on file";
    break;

    case "sherman":
    case "shermans":
    case "alansherman":
    case "alanshermans":
    speechOutput = "Dr. Shermans office is in I.T.E. 224," +
    "Office hours are, wednesday 9-10am.";
    break;

    case "shook":
    case "shooks":
    case "adamshook":
    case "adamshooks":
    speechOutput = "Adam Shooks office hours are, tuesday and thursday 6-7pm in I.T.E. 374.";
    break;

    case "sidhu":
    case "sidhus":
    case "deepindersidhu":
    case "deepindersidhus":
    speechOutput = "Dr. Sidhus office is in I.T.E. 347," +
    "Office hours are, tuesday and thursday 3:15-4pm.";
    break;

    case "simon":
    case "simons":
    case "tylersimon":
    case "tylersimons":
    speechOutput = "Dr. Simon has no office or office hours on file.";
    break;

    case "slaughter":
    case "slaughters":
    case "gymamaslaughter":
    case "gymamaslaughters":
    speechOutput = "Dr. Slaughters office is in I.T.E. 311," +
    "Office hours are, monday and wednesday 11am to noon.";
    break;

    case "smalkin":
    case "smalkins":
    case "fredsmalkin":
    case "fredsmalkins":
    speechOutput = "Fred Smalkin has no office or office hours on file.";
    break;

    case "squire":
    case "squires":
    case "jonsquire":
    case "jonsquires":
    speechOutput = "Jon Squires office hours are, tuesday and thursday 2:30-3:45pm in I.T.E. 226.";
    break;

    case "syed":
    case "syeds":
    case "zareensyed":
    case "zareensyeds":
	speechOutput = "Professor Syeds office is in I.T.E. 301, but has no office hours on file.";
	break;

    case "tang":
    case "tangs":
    case "jasontang":
    case "jasontangs":
    speechOutput = "Jason Tangs office hours are, tuesday and thursday 7-8pm, but has no office location on file";
    break;

    case "tompkins":
    case "tompkinses":
    case "geraldtompkins":
    case "geraldtompkinses":
    speechOutput = "Gerald Tompkinses office hours are, tuesday and thursday 6:10-7:10pm. but has no office location on file";
    break;

    case "weiss":
    case "weisses":
    case "geoffweiss":
    case "geoffweisses":
    speechOutput = "Geoff Weisses office is in I.T.E. 302, but has no office hours on file";
    break;

    case "wiles":
    case "wileses":
    case "andrewwiles":
    case "andrewwileses":
    speechOutput = "Andrew Wiles has no office or office hours on file.";
    break;

    case "wolfe":
    case "wolfes":
    case "olivia wolfe":
    case "olivia wolfes":
    speechOutput = "Olivia Wolfes office is in I.T.E. 325F, but has no office hours on file";
    break;

    case "yan":
    case "yans":
    case "liyan":
    case "liyans":
    speechOutput = "Dr. Yans office is in I.T.E. 315, but has no office hours on file";
    break;

    case "yesha":
    case "yeshas":
    case "yaacovyesha":
    case "yaacovyeshas":
    speechOutput = "Dr. Yaacov Yeshas office is in I.T.E. 333, but has no office hours on file";
    break;

    case "yelenayesha":
    case "yelenayeshas":
    speechOutput = "Dr. Yelena Yeshas office is in I.T.E. 335, but has no office hours on file";
    break;

    case "younis":
    case "younises":
    case "yohamedyounis":
    case "yohamedyounises":
    speechOutput = "Dr. Younises office is in I.T.E. 318," +
    "Office hours are, monday and wednesday 10:30-11:30am.";
    break;

    case "zhu":
    case "zhus":
    case "tingzhu":
    case "tingzhus":
    speechOutput = "Dr. Zhus office is in I.T.E. 360," +
    "Office hours are, monday and wednesday 3:50-4:50pm.";
    break;

    case "zieglar":
    case "zieglars":
    case "edwardzieglar":
    case "edwardzieglars":
    speechOutput = "Edward Zieglars office hours are, tuesday and thursday 6-7pm, but has no office location on file";
    break;
 
    default:
	speechOutput = repromptText;
	break;
    }

    callback(sessionAttributes,
	     buildSpeechletResponseOffice(cardTitle, speechOutput, repromptText, shouldEndSession));
}

function getAnswer(intent, session, callback) {
    var cardTitle = intent.name;
    var questionNameSlot = intent.slots.Question;
    var repromptText = "Please repeat your question.";
    var sessionAttributes = {};
    var shouldEndSession = false;
    var speechOutput = "";
    
    switch(questionNameSlot.value){
    case "advising office":
    speechOutput = "The advising office is in I.T.E. 202 through 206";
    break;

    case "my adviser":
    speechOutput = "The advising office can tell you who your advisor is.";
    break;

    case "card access":
    case "card swipe access":
    case "lab access":
    case "the lab":
    case "a lab":
    speechOutput = "Email Olivia Wolfe at O Wolfe@UMBC dot E.D.U., Make sure you C.C. your" +
    "instructor or faculty member.";
    break;

    case "register for a class that is full":
    case "register for a full class":
    speechOutput = "You will need to request permission. Google CMSC UMBC Student Forms," +
    "and fill out the form called, Permission to Enroll, in a Closed Course.";
    break;

    case "contact a professor":
    speechOutput = "The best way to reach them is by e-mail. Use the university" +
    "directory at U.M.B.C. dot E.D.U /search/directory";
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
    speechOutput = "You must go to Student Business Services on the third floor ove" +
    "the Administration Building.";
    break;

    case "permission for a class":
    case "permission to enroll":
    speechOutput = "Email Dr. Richard Chang at, chang@UMBC dot E.D.U.";
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

function buildSpeechletResponseOffice(title, output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "PlainText",
        text: output
        },
        card: {
            type: "Standard",
            title: "ITE Building",
            text: "Map of the 3rd floor",
            image: {
                smallImageUrl: "https://i.imgur.com/uVJHCWh.jpg",
                largeImageUrl: "https://i.imgur.com/n3uybE8.jpg"
            }
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