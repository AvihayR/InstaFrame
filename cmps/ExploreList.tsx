import { Post, Comment } from '../typings'
import ExplorePreview from './ExplorePreview'

interface ExploreListProps {
    posts: Post[]
}

const ExploreList: React.FC<ExploreListProps> = ({ posts }) => {

    return (
        <section className='explore-list flex gap-2 w-11/12'>
            {posts.map(post => <ExplorePreview key={post._id} post={post} />)}
        </section>
    )
}

export default ExploreList

