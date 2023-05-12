# Node.js Project with Vanilla JS and OpenAI SDK

This project demonstrates how to use the OpenAI SDK with Node.js and Vanilla JavaScript to create natural language processing (NLP) applications.

## Requirements

Before continuing, ensure you have the following installed on your system:

- Node.js
- npm
- An OpenAI API key

## Installation

To install the project, follow these steps:

1. Clone this repository to your computer
2. In the project folder, run `npm install` to install the dependencies.
3. Create a `.env` file in the root of the project and add your OpenAI API key in a variable called `OPENAI_API_KEY`.

## Usage

The project includes two examples of NLP functionalities using the OpenAI API: embeddings + textCompletion and chatCompletion.

### Example 1: Embeddings + TextCompletion

This example uses the OpenAI API to generate a list of words similar to a given word using embeddings, and then uses the text completion function to generate a complete sentence from a user-entered seed text.

To try this example, run the following command in the terminal:

```
cd ask_a_test
node index.js
```

### Example 2: ChatCompletion

This example uses the OpenAI API to create an autocomplete chatbot that can respond to questions and have simple conversations with the user.

To try this example, run the following command in the terminal:

```
cd chat_completion
node example_1.js
node example_2.js
```

We have some examples in this folder:

- **example_1**: simple prompt, tell me a joke
- **example_2**: simple prompt, remember your name
- **example_3**: medium prompt, remember your name, recycle context to use as memory.

### Order Bots

Is a collection of some chatbots via console, to simulate a conversation
with a specific purposse

```
cd orderBot
npm start
```

We have some examples in this folder:

- **orderBot**: A chat bot to order a pizza.
- **orderBot dinero**: A chat bot to buy electric scotters.

### Chatbot server

This is a simple integration with twilio whatsapp and a nodejs server with express, with this code you can chat and share comments with the chatbot.
**Note:** Add a .env file with the openai and twilio tokens and phone number.

```
cd chatbot-server
npm start
```

## Conclusion

This project provides a simple demonstration of how to use the OpenAI SDK with Node.js and Vanilla JavaScript to create NLP applications. Feel free to experiment with different OpenAI API functions and use this project as a starting point for your own NLP projects.
