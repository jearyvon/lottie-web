function IImageElement(data,globalData,comp){
    this.assetData = globalData.getAssetData(data.refId);
    this.thumbMode = globalData.thumbMode;
    this.initElement(data,globalData,comp);
    this.sourceRect = {top:0,left:0,width:this.assetData.w,height:this.assetData.h};
}

extendPrototype([BaseElement,TransformElement,SVGBaseElement,HierarchyElement,FrameElement,RenderableDOMElement], IImageElement);

IImageElement.prototype.createContent = function(){
    var assetPath ='';
    if(!this.assetData.src){
        assetPath = this.globalData.getAssetsPath(this.assetData);
    }else{
        assetPath = this.assetData.src;
    }
    if(this.thumbMode){
        assetPath = this.assetData.base64;
    }
    this.innerElem = createNS('image');
    this.innerElem.setAttribute('width',this.assetData.w+"px");
    this.innerElem.setAttribute('height',this.assetData.h+"px");
    this.innerElem.setAttribute('preserveAspectRatio',this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio);
    this.innerElem.setAttributeNS('http://www.w3.org/1999/xlink','href',assetPath);
    this.innerElem.setAttribute('class',this.assetData.id);
    this.layerElement.appendChild(this.innerElem);

};

IImageElement.prototype.sourceRectAtTime = function() {
	return this.sourceRect;
}