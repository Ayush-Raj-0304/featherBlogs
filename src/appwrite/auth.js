import conf from "../conf/conf";

import {Client , Account, ID} from "appwrite"

//this class will deal with all the methods resonsible for account auth activities
class AuthService 
{
    client = new Client(); //syntax from appwrite documentation
    account;

    constructor()
    {
        // apne project id or endpoint ka madad leke ek connection request banai
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);  //syntax from appwrite documentation 

        // apne account ko pe se is project ka access dene ki request maari
        this.account = new Account(this.client);  //syntax from appwrite documentation
    }

    //method to create/add new users to website 
    async createAccount({email,password,name}) 
    {
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);  //syntax from appwrite documentation
                                                                                            // ID.unique() is like nanoID we used earlier
            if(userAccount)
            {
                //if account is created login the user at that instant
                return this.login({email,password});
            }
            else
            {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email,password})
    {
        try {
            return await this.account.createEmailPasswordSession(email,password);  //syntax from appwrite documentation
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser()
    {
        try {
            return await this.account.get();  //syntax from appwrite documentation
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }

    async logout()
    {
        try {
            await this.account.deleteSessions();//all session from all the browsers will be deleted.  //syntax from appwrite documentation
                                                //if used deleteSession() instead of the above code , it will take paramerter like "current" , "all" so as to get finer control over sessionDeletions
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
};

const authService = new AuthService(); // ye banaya hamne ek object class ka 
// is object mein jitne methods hai, createAcocunt (Sign Up), (Sign In) , log out , log in sb . krke access kr skte
// kyuki sb class mein implemented hai
// ab jab bhi backend change krna hua appwrite se firebase ya kuch or
// to bs hm AuthService ki class mein methods ke andar change kr lenge , jis backend ko use kr rhe uske according bs




export default authService