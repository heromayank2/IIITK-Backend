var connectionString = 'DefaultEndpointsProtocol=https;AccountName=iiitkotabucket1;AccountKey=4HcGY3lD2u3rfFw+jEz/aYLt6zaZ5ZHHNva3TNgckZO09LwCdbB9FEVlyckhbXPNUZJK+4MSvP/RB/Kf2/BALg==;EndpointSuffix=core.windows.net'
var auth = require("./auth");
const
      express = require('express')
    , router = express.Router()

    , multer = require('multer')
    , inMemoryStorage = multer.memoryStorage()
    , uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

    , azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService(connectionString)

    , getStream = require('into-stream')
    , containerName = 'resources1'
;
// const containerClient = await blobServiceClient.getContainerClient(containerName);

const handleError = (err, res) => {
    console.log("Error in uploading")
};

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
};

router.post('/', uploadStrategy, (req, res) => {

    const
          blobName = getBlobName(req.file.originalname)
        , stream = getStream(req.file.buffer)
        , streamLength = req.file.buffer.length
    ;



    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {

        if(err) {
            handleError(err);
            console.log(err)
            return;
        }
        let token = req.query.token;
        res.redirect('/dashboard?token='+token)
    });
});

module.exports = router;