
$(function(){
	
	var aspectRatio;
	var croppedImageBase64;
	
	
function draw(base64) {
	var image = document.getElementById("image");		
	var imgObj = new Image();	
	imgObj.src = base64;

  	var canvas = document.createElement('canvas');  	
  	if (canvas.getContext) {
	    var ctx = canvas.getContext('2d');
	  	
	    imgObj.onload = function(){
	    	
	    	canvas.height = imgObj.height;
	    	canvas.width = imgObj.width;
	    	console.log("executing height");

	    	image.height = (image.width / imgObj.width) * imgObj.height;
	    	aspectRatioR = image.width/image.height;
	    	aspectRatio = image.width / imgObj.width;
	    	
		  	console.log(image.height)
		  	console.log(image.width)
		  	console.log(imgObj.height)
		  	console.log(imgObj.width)
		  	
		  	ctx.drawImage(imgObj, 0, 0, imgObj.width, imgObj.height);
		  
		  	image.src = canvas.toDataURL();
		  	
	   };
  	}
}

draw(img);



function getSelection(image, selection) {
	console.log("inside getSelection");

	if (parseInt(selection.width) > 0) {
        // Show image preview
        if (selection.x1 != 0 && selection.y1 != 0 && selection.width != 0 && selection.height != 0) {
        	var x1 = selection.x1;
        	var y1 = selection.y1;
        	var width = selection.width;
        	var height = selection.height;
        	        	
        	var canvas = document.createElement('canvas');
        	var canvasContext = canvas.getContext('2d'); 
        	
	    	
        	var newHeight = height/aspectRatio;
        	var newWidth = width/aspectRatio;
        	
        	canvas.height = newHeight;
	    	canvas.width = newWidth;
        	
	    	canvasContext.drawImage(image,x1/aspectRatio,y1/aspectRatio,newWidth,newHeight,0,0,newWidth,newHeight);
	    	
	    	var croppedImage = document.getElementById("croppedImage");
	    	croppedImage.src = canvas.toDataURL();
	    	croppedImageBase64 = croppedImage.src;	    	
        	
        }       
    }
};

$('#image').imgAreaSelect({
    handles: true,
    onSelectEnd: getSelection
});


$("#submit").click
(
    function()
    {
    	$('#submitMessage').val("");
    	$.ajax
        (
            {
                url:'/AutoDraw/SelectionOCR',
                data: {"croppedImageBase64":croppedImageBase64},
                type:'post',
                success:function(data){
                	console.log(data);
                	$('#submitMessage').val(data);                	
                },
                error:function(err){
                	console.log(err)
                	
                }
            }
        );
    }
);

$("#reset").click
(
    function()
    {
    	draw(img);
    });


});