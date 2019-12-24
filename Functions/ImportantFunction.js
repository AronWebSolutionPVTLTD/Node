

exports.sKey=function(message,data=[])
{
    response_array={}
    response_array.status_code=1
    response_array.status_message='success'
    response_array.message=message
    response_array.data=data
    return response_array

}

exports.fKey=function(message,data=[])
{
    response_array={}
    response_array.status_code=0
    response_array.status_message='failed'
    response_array.message=message
    response_array.data=data
    return response_array

}

exports.page=function(page)
{
   
    if(!page) page=1
    return page
}


exports.per_page=function(per_page)
{
    if(!per_page) per_page=25
    return per_page
}

exports.order=function(order)
{
    if( !order || (order != 'asc' && order != 'ASC' && order != 'DESC' && order != 'desc' )) order='ASC'
    return order
}


exports.order_by=function(order_by)
{
    if(!order_by) order_by= 'id';
    return order_by
}