import commonApi from "./commonApi";
import base_url from "./base_url";



//signup api request
export const signupApi=async(data)=>{
    return await commonApi(`${base_url}/signup`,'POST',data,'')
}

//signin api
export const signinApi=async(data)=>{
    return await commonApi(`${base_url}/signin`,'POST',data,'')
}

//GOOGLE SIGNIN API
export const googlesigninApi=async(data)=>{
    return await commonApi(`${base_url}/google-login`,'POST',data,'')
}


//Authorized user based apis

//Add Book Api
export const addbookAPi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type":"multipart/form-data"
    }
    return await commonApi(`${base_url}/add-book`,'POST',data,header)
}

//Home Books Api
export const homeBookApi=async()=>{
    return await commonApi(`${base_url}/home-books`,"GET",{},'')
}

//AllBooks Api
export const allBooksApi=async(search)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/all-books?search=${search}`,"GET",{},header)
}

//getBookById Api
export const getBookByIdApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/getbookbyid/${id}`,"GET",{},header)
}


//get user added books api
export const getUserBooksApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/user-books`,"GET",{},header)
}

//remove user book by id api
export const removeUserBookApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/getbook/${id}/delete`,"DELETE",{},header)
}

//get user bought books api
export const getBoughtBooksApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/bought-books`,"GET",{},header)
}

//get profile details of user
export const getProfileApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/get-profile`,"GET",{},header)
}

//profile update
export const profileUpdateAPi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type":"multipart/form-data"
    }
    return await commonApi(`${base_url}/profile-update`,"PUT",data,header)
}
//list jobPOsts
export const ListJobPostApi=async(search)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/list-jobposts?search=${search}`,"GET",{},header)
}

//apply for job
export const applyJobPostApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type":"multipart/form-data"
    }
    return await commonApi(`${base_url}/apply-jobpost`,"POST",data,header)
}

//purchase Book
export const purchaseBookApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/purchase-book`,"POST",data,header)
}

//ADMIN

//get all books
export const getAdminAllBooksApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/get-books`,"GET",{},header)
}

//get all users
export const getAdminAllUsersApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/get-users`,"GET",{},header)
}

//approve book
export const adminApproveBookApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/approve-book/${id}`,"PATCH",{},header)
}

//add job post
export const adminAddJobPostApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/add-jobpost`,"POST",data,header)
}

//list job post
export const adminListJobPostApi=async(search)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/list-jobpost?search=${search}`,"GET",{},header)
}

//delete job post
export const adminDeleteJobPostApi=async(id)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/delete-jobpost/${id}`,"DELETE",{},header)
}
//list applicants
export const getAdminApplicationsApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/get-applications`,"GET",{},header)
}
//get admin profile
export const getAdminProfileApi=async()=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`
    }
    return await commonApi(`${base_url}/admin/get-adminprofile`,"GET",{},header)
}

//profile update
export const adminProfileUpdateApi=async(data)=>{
    const header={
        "Authorization":`Token ${sessionStorage.getItem('token')}`,
        "Content-Type":"multipart/form-data"
    }
    return await commonApi(`${base_url}/admin/update-adminprofile`,"PATCH",data,header)
}