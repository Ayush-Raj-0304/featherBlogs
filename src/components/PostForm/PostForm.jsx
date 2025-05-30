import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import Button from "../Button/Button";
import Select from "../../components/Select/Select"
import dbService from "../../appwrite/database_service"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import RTE from "../RealTimeTextEditor/RTE";
import AnimatedFadeIn from "../AnimatedFadeIn";

function PostForm({post})
{
    const { register, handleSubmit, control, setValue, watch, getValues } = useForm({
        defaultValues: {
          title: post?.title || "",
          slug: post?.$id || "",
          content: post?.content || "",
          status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state)=>(state.auth.userData));

    const submit = async(data)=>
    {
       if(post)
       {
            const file = data.image[0]? await dbService.uploadFile(data.image[0]) : null;

            if(file)
            {
                dbService.deleteFile(post.featuredImage);
            }

            const dbPost = await dbService.updatePost(post.$id, {featuredImage : file? file.$id : undefined, ...data})

            if(dbPost)
            {
                navigate(`/post/${dbPost.$id}`);
            }
       }
       else
       {
        const file = await dbService.uploadFile(data.image[0]);

        if(file)
        {
            data.featuredImage = file.$id;
            const dbPost = await dbService.createPost({...data, userId : userData.$id});

            if(dbPost)
            {
                navigate(`/post/${dbPost.$id}`);
            }
        }
       }
    }

    const slugTransform = useCallback((value)=>{
    if(value && typeof value === "string")
    {
        return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
    }
    },[]);

    useEffect(()=>{
        const subscription = watch((value, {name})=>{
            if(name === "title")
            {
                setValue("slug",slugTransform(value.title) , {shouldValidate: true});
            }
        })
        return ()=> (subscription.unsubscribe());
    },[ watch ,slugTransform , setValue]);

    return(
        <AnimatedFadeIn>
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">               
                
                <Input
                    label = "Title"
                    placeholder = "Title"
                    className = "mb-4"
                    {
                        ...register("title",{
                            required : true,
                        })
                    }
                />
                <Input
                    label = "Slug"
                    placeholder = "Slug"
                    className= "mb-4"
                    {
                        ...register("slug",{
                            required : true,
                        })
                    }
                    onInput = { (e)=>{
                        setValue("slug",slugTransform(e.currentTarget.value),{
                            shouldValidate : true,
                        })
                    }}
                />
                <AnimatedFadeIn delay={1}>
                <RTE label = "Content" name="content" control= {control} defaultValue={getValues("content")}/>
                </AnimatedFadeIn>
                
            </div>

            <div className="w-1/3 px-2">

                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                { post && (
                            <div className="w-full mb-4">
                                <img
                                    src={dbService.getFilePreview(post.featuredImage)}
                                    alt={post.title}
                                    className="rounded-lg"
                                />
                            </div>
                          )
                }
                <Select 
                    options= {["Active", "Inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { 
                        required: true,
                    })}
                    />
                <Button type="submit" bgColor={post? "bg-greem-500" : undefined} className="w-full">
                    {post? "Update" : "Submit"}
                </Button>
            </div>
        </form>         
        </AnimatedFadeIn>       
    )
}

export default PostForm;