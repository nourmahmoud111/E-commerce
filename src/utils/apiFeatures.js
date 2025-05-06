export class ApiFeatures {
    constructor (mongooseQuery,serachQuery){
        this.mongooseQuery=mongooseQuery
        this.serachQuery=serachQuery
    }
pagination(){
    let pageNumber = this.serachQuery.page * 1||1
    if(this.serachQuery.page < 1) pageNumber = 1
    const limit = 2
    let skip = (pageNumber-1)*limit
    this.pageNumber=pageNumber
    this.mongooseQuery.skip(skip).limit(limit)
    return this
}
filter(){
    let filterObj=structuredClone(this.serachQuery) //deep copy
    filterObj=JSON.stringify(filterObj)
    filterObj=filterObj.replace(/(g|gte|lt|lte)/g , value => `$${value}`)
    filterObj=JSON.parse(filterObj)
    let excludedFields = ['page','sort','search','fields']
    excludedFields.forEach(val=>{
        delete filterObj[val]
    })
    this.mongooseQuery.find(filterObj);
    return this
}
sort(){
    if(this.serachQuery.sort){
        let sortedBy = this.serachQuery.sort.split(',').join(' ')
        this.mongooseQuery.sort(sortedBy)
    }
    return this
}
fields(){
         if(this.serachQuery.fields){
                let selectedFields = this.serachQuery.fields.split(',').join(' ')
                this.mongooseQuery.select(selectedFields)
            }
            return this

}
search(){
               if(this.serachQuery.search){
                    this.mongooseQuery.find(
                        {
                            $or: [
                                {title :{$regex :req.query.search, $options:'i' }},
                                {description :{$regex :req.query.search, $options:'i' }}
                            ]
                        }
                    )
                }
                return this
}

}


