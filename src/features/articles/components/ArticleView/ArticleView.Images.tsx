import { ImageLightBox } from '@features/ui';
import { IArticle } from '@models/Article';

interface IArticleViewImagesProps {
    article?: IArticle
    isLoading?: boolean
}


export function ArticleViewImages({ article }: IArticleViewImagesProps) {
    return (
        <div>
            <div className="font-semibold mb-5">Изображения</div>
            <div className="flex flex-wrap gap-6">
                {article?.files.map((item) => (
                    <ImageLightBox src={process.env.REACT_APP_API_URL + item.src}>
                        <div className="w-52 h-40 rounded-xl overflow-hidden">
                            <img src={process.env.REACT_APP_API_URL + item.src} alt="" className='w-full h-full object-cover' />
                        </div>
                    </ImageLightBox>
                ))}
            </div>
        </div>
    );
}
