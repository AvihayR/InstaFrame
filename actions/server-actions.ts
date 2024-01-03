import { postService } from "@/services/post.service.local"
import { utilService } from "@/services/util.service"
import { SET_CHOSEN_POST, UPDATE_POST } from "@/store/reducers/posts.reducer"
import { store } from "@/store/store"
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
        const updatedPost = await postService.addComment(postId, comment as Comment)
        console.log({ ...updatedPost, postId })
        store.dispatch({ type: UPDATE_POST, post: updatedPost })
        store.dispatch({ type: SET_CHOSEN_POST, post: updatedPost })

        return { ...postService.getEmptyComment(), postId }
    } catch (err) {
        console.log('Please login to continue..')
        return { ...comment, postId }
    }
}