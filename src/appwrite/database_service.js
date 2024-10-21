import conf from "../conf/conf";

import {Client , ID , Databases, Storage , Query} from "appwrite"

export class Service
{
    client  = new Client();
    databases;
    storage;

    constructor()
    {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status, userId})
    {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );

        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug,{title,content, featuredImage,status})
    {
        try {   
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //can be changed
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error", error)
        }
    }

    async deletePost(slug)
    {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Services :: deletePost :: error", error);
            return false
        }
    }

    async getPost(postId)
    {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error", error);
        }
    }

    async getPosts(userId = null, queries = [Query.equal("status", "active")]) {
        try {
            if (userId) {
                // For Home component, get all posts by the user (active and inactive)
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    [
                        Query.equal("userId", userId) // Query to get posts by userId
                    ]
                );
            } else {
                // For AllPosts component, get only active posts (other users)
                return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    queries,
                );
            }
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
        }
    }

    //file upload service

    async uploadFile(file)
    {
        try {   
            return await this.storage.createFile(
            conf.appwriteBucketId,
            ID.unique(),
            file
            )
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId)
    {
        try {   
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId)
    {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
};

const dbService = new Service();

export default dbService;