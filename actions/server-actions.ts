import { postService } from "@/services/post.service.local"
import { utilService } from "@/services/util.service"
import { Comment } from "@/typings"

export interface commentState extends Comment {
    postId: string
}

export async function onPostComment(prevState?: commentState, formData?: FormData) {
    const txt = formData?.get('txt')?.toString() || '';
    const { id, by, likedBy, postId } = prevState || {
        id: '',
        by: {
            userId: '',
            username: '',
            imgUrl: '',
        },
        likedBy: [],
        postId: '',
    }

    const comment = {
        id, by, likedBy, txt,
        postedAt: Date.now()
    }


    try {
        const postedComment = await postService.addComment(postId, comment as Comment)
        console.log({ ...postedComment, postId })
        return { ...postedComment, postId }
    } catch (err) {
        console.log('Please login to continue..')
        return { ...comment, postId }
    }
}