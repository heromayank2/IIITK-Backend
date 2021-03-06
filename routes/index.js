var connectionString = 'DefaultEndpointsProtocol=https;AccountName=iiitkotabucket1;AccountKey=4HcGY3lD2u3rfFw+jEz/aYLt6zaZ5ZHHNva3TNgckZO09LwCdbB9FEVlyckhbXPNUZJK+4MSvP/RB/Kf2/BALg==;EndpointSuffix=core.windows.net'
var auth = require("./auth");

const
      express = require('express')
    , router = express.Router()
    , azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService(connectionString)
    , containerName = 'resources1'
;

router.get('/',(req,res)=>{
  // if() check for auth done or not
  if(1==1){
    viewData = {
      title: 'login',
      viewName: 'login'
    };
    return res.render(viewData.title,viewData);
  }else{
    res.redirect('/dashboard')
  }
});

router.get('/dashboard',auth.required, (req, res, next) => {

  blobService.listBlobsSegmented(containerName, null, (err, data) => {

    let viewData;
    var ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress
    var token = req.query.token;

    if (err) {

      viewData = {
        title: 'Error',
        viewName: 'error',
        message: 'There was an error contacting the blob storage container.',
        error: err
      };
      
      res.status(500);

    } else {

      viewData = {
        title: 'Dashboard',
        viewName: 'index',
        accountName: 'iiitkotabucket1',
        containerName: containerName,
        ip:ip,
        token:token
      };

      if (data.entries.length) {
        viewData.resources1 = data.entries;
      }
      
    }

    res.render(viewData.viewName, viewData);
  });

});

module.exports = router;