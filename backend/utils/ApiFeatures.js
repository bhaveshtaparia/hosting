class ApiFeatures{
    // query means data where you want to search ,querystr->is keywoard
    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;

    }
    search(){
        const keyword=this.querystr.keyword?{
         name:{
            //regular expression
            $regex:this.querystr.keyword,
            // case insensitive( i means) if we search HELLO or hello both are same 
            $options:"i"
         }
        }:{}
        // console.log({...keyword});
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){

        // this is (...) a spread operator this copy the object or array data 
        // one other object and array data
        const queryCopy={...this.querystr}
        //removing some field for category
        const removeFields=["keyword","page","limit"];
        removeFields.forEach((key)=>{
            delete queryCopy[key];
        })

        // filter for price 
        let querystr=JSON.stringify(queryCopy);
        // regular expression -->help for search simple and complex pattern
        querystr=querystr.replace(/\b(gt|gte|lt|lte)\b/g,key=>`$${key}`);
        // console.log(querystr);
        this.query=this.query.find(JSON.parse(querystr));
        return this;

    }
    pagination(resultPerPage){
     const currentPage=Number(this.querystr.page)|| 1;

     const skip=resultPerPage*(currentPage-1);
     this.query=this.query.limit(resultPerPage).skip(skip);
     return this;

    }
}
module.exports=ApiFeatures;