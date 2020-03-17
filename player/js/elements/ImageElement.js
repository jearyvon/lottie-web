function IImageElement(data,globalData,comp){

    this.assetData = globalData.getAssetData(data.refId);
    this.thumbMode = globalData.thumbMode;
    this.imgUrl = '';
    this.initElement(data,globalData,comp);
    this.sourceRect = {top:0,left:0,width:this.assetData.w,height:this.assetData.h};

    if(this.globalData.tags['imagesTags']&&this.globalData.tags['imagesTags'][this.tag]){

        if(!this.globalData.tags['imagesTags'][this.tag].transform){
            this.globalData.tags['imagesTags'][this.tag].transform =this.finalTransform.mProp;
            this.globalData.tags['imagesTags'][this.tag].rect =this.sourceRect;
        }
    }

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
    this.imgUrl = assetPath;
    this.innerElem = createNS('image');
    this.innerElem.setAttribute('width',this.assetData.w+"px");
    this.innerElem.setAttribute('height',this.assetData.h+"px");
    this.innerElem.setAttribute('preserveAspectRatio',this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio);
    this.innerElem.setAttributeNS('http://www.w3.org/1999/xlink','href',assetPath);
    this.innerElem.setAttribute('class',this.assetData.id);
    this.layerElement.appendChild(this.innerElem);

};
IImageElement.prototype.checkUpdate = function() {
    var assetPath ='';
    if(this.assetData.src){
        assetPath = this.assetData.src;
    }else{
        assetPath = this.globalData.getAssetsPath(this.assetData);
    }
    if(this.thumbMode){
        assetPath = this.assetData.base64;
    }
    //因为资源是引用类型变动的时候可能会边。
    if(this.sourceRect.width==this.assetData.w &&this.sourceRect.height == this.assetData.h && this.imgUrl == assetPath){
        return false;
    }else{
        this._mdf = true;
        this.finalTransform._matMdf = true;
        this.finalTransform.mProp._mdf = true;
        this.finalTransform.mProp._isDirty = true;
        this.finalTransform.mProp.getValue();
        console.log(this.finalTransform.mProp)
    }
}

IImageElement.prototype.updateContent = function(){
    var assetPath ='';
    if(this.assetData.src){
        assetPath = this.assetData.src;
    }else{
        assetPath = this.globalData.getAssetsPath(this.assetData);
    }
    if(this.thumbMode){
        assetPath = this.assetData.base64;
    }

    this.sourceRect = {top:0,left:0,width:this.assetData.w,height:this.assetData.h};
    this.imgUrl = assetPath;
    this.innerElem.setAttribute('width',this.assetData.w+"px");
    this.innerElem.setAttribute('height',this.assetData.h+"px");
    this.innerElem.setAttribute('preserveAspectRatio',this.assetData.pr || this.globalData.renderConfig.imagePreserveAspectRatio);
    this.innerElem.setAttributeNS('http://www.w3.org/1999/xlink','href',assetPath);
    this.innerElem.setAttribute('class',this.assetData.id);


}
IImageElement.prototype.sourceRectAtTime = function() {
	return this.sourceRect;
}