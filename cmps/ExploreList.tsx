import { Post, Comment } from '../typings'
import ExplorePreview from './ExplorePreview'

interface ExploreListProps {
    posts: Post[]
    openModal: () => void
}

const ExploreList: React.FC<ExploreListProps> = ({ posts, openModal }) => {

    return (
        <section className='explore-list grid grid-cols-3 gap-1'>
            {posts.map((post, i) => {
                if ((i - 2) % 10 === 0 || (i - 5) % 10 === 0) return <ExplorePreview key={post._id} openModal={openModal} post={post} isTall={true} />
                else return <ExplorePreview key={post._id} openModal={openModal} post={post} />
            })}
        </section>
    )
}

export default ExploreList