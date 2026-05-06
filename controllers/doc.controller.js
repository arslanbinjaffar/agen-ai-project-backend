const { addDocument } = require("../rag/ragService");


 const docsController = async (req, res) => {
  const { message,title,descriptions } = req.body;

  const docs=await addDocument(`${title}\n${descriptions}\n${message}`);

  res.json({ message: "Document added successfully", docs });
};

module.exports={
    docsController
}