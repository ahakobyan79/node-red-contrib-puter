// src/puter.js
module.exports = function(RED) {
    function PuterNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const Puter = require('puter');
        const puter = new Puter();

        // Authenticate with Puter
        function authenticate() {
            if (!node.credentials || !node.credentials.username || !node.credentials.password) {
                node.error("Missing credentials");
                node.status({fill:"red",shape:"ring",text:"missing credentials"});
                return;
            }
            puter.signIn(node.credentials.username, node.credentials.password)
                .then(session => {
                    node.session = session;
                    node.status({fill:"green",shape:"dot",text:"authenticated"});
                })
                .catch(error => {
                    node.error("Authentication failed: " + error.message);
                    node.status({fill:"red",shape:"ring",text:"authentication failed"});
                });
        }

        // Attempt initial authentication
        authenticate();

        node.on('input', function(msg) {
            if (!node.session) {
                node.error("Not authenticated");
                authenticate(); // Try to authenticate again
                return;
            }
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
            username: {type: "text"},
            password: {type: "password"}
        }
    });
}
