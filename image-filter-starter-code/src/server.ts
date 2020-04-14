import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());


  
  app.get( "/filteredimage", async ( req: Request, res: Response ) => {
    const qery_url = req.query.image_url;
    var image_ar: string[] = new Array(); 
    let url: string;

  if (qery_url){
    try {
      url =  await filterImageFromURL(qery_url.toString())  
    } catch(e) {
     console.log(e);
    }
    res.status(201).sendFile(url);
     image_ar.push(url);
  
    if(image_ar.length > 1){
      try { 
        await deleteLocalFiles(image_ar);
      }
      catch(e){}
     }
   
  }
 

  

  } );


  


  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();




// var paramsString2 = "?query=value";
// var searchParams2 = new URLSearchParams(paramsString2);
// searchParams2.has("query"); // true 

// var url = new URL("http://example.com/search?query=%40");
// var searchParams3 = new URLSearchParams(url.search);
// searchParams3.has("query") // true