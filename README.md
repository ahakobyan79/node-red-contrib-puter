# node-red-contrib-puter

A Node-RED node for interacting with the Puter.js file storage service.

## Description

This Node-RED node allows you to easily integrate Puter.js file storage operations into your Node-RED flows. With this node, you can perform operations such as reading files, writing files, and listing files in your Puter.js storage directly from Node-RED.

## Features

- Read files from Puter.js storage
- Write files to Puter.js storage
- List files in a specified directory
- Easy configuration with API key input

## Installation

To install this node, run the following command in your Node-RED user directory (typically ~/.node-red):

```bash
npm install node-red-contrib-puter
```

## Usage

1. Drag the 'puter' node from the palette to your flow.
2. Double-click on the node to configure it.
3. Enter your Puter.js API key.
4. Select the operation you want to perform (Read File, Write File, or List Files).
5. Configure the path and other options as needed.
6. Connect the node to your flow and deploy.

### Node Configuration

- **API Key**: Your Puter.js API key (required)
- **Operation**: Choose between 'Read File', 'Write File', or 'List Files'
- **Path**: The path of the file or directory in your Puter.js storage
- **Content**: (For Write File operation) The content to write to the file

### Input

The node accepts input messages with the following properties:

- `msg.payload.path`: Overrides the path set in the node configuration
- `msg.payload.content`: (For Write File operation) Overrides the content set in the node configuration

### Output

The node outputs a message with the following properties:

- For Read File: `msg.payload` contains the content of the file
- For Write File: `msg.payload` contains a success message
- For List Files: `msg.payload` contains an array of file objects

## Example Flow

Here's a simple example of how to use the Puter node to read a file:

```json
[
    {
        "id": "puter-node",
        "type": "puter",
        "name": "Read File",
        "apiKey": "your-api-key",
        "operation": "readFile",
        "path": "/path/to/your/file.txt",
        "wires": [
            [
                "debug-node"
            ]
        ]
    },
    {
        "id": "debug-node",
        "type": "debug",
        "name": "Debug",
        "active": true,
        "complete": "payload",
        "wires": []
    }
]
```

## Development

To contribute to this project:

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/node-red-contrib-puter.git`
3. Install dependencies: `npm install`
4. Make your changes
5. Run tests: `npm test`
6. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Anri Hakobyan

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/yourusername/node-red-contrib-puter/issues) on GitHub.

## Acknowledgments

- [Node-RED](https://nodered.org/) for the wonderful low-code programming tool
- [Puter.js](https://docs.puter.com/) for their file storage service

