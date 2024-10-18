// puter.js
module.exports = function(RED) {
    function PuterNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const Puter = require('puter.com');

        // Initialize Puter client with credentials
        const puter = new Puter({
            username: node.credentials.username,
            password: node.credentials.password
        });

        node.on('input', function(msg) {
            const operation = config.operation;
            const path = msg.payload.path || config.path;
            const content = msg.payload.content || config.content;

            switch(operation) {
                case 'readFile':
                    puter.readFile(path)
                        .then(content => {
                            msg.payload = content;
                            node.send(msg);
                        })
                        .catch(error => {
                            node.error("Error reading file: " + error.message);
                        });
                    break;
                case 'writeFile':
                    puter.writeFile(path, content)
                        .then(() => {
                            msg.payload = { success: true, message: "File written successfully" };
                            node.send(msg);
                        })
                        .catch(error => {
                            node.error("Error writing file: " + error.message);
                        });
                    break;
                case 'listFiles':
                    puter.listFiles(path)
                        .then(files => {
                            msg.payload = files;
                            node.send(msg);
                        })
                        .catch(error => {
                            node.error("Error listing files: " + error.message);
                        });
                    break;
                default:
                    node.error("Unsupported operation");
            }
        });
    }
    RED.nodes.registerType("puter", PuterNode, {
        credentials: {
            username: { type: "text" },
            password: { type: "password" }
        }
    });
}
