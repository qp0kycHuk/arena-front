import { ImageLightBox } from '@features/ui';
import { IArticle } from '@models/Article';

interface IArticleViewImagesProps {
    article?: IArticle
    isLoading?: boolean
}

export function ArticleViewImages({ article, isLoading }: IArticleViewImagesProps) {
    if (!article || isLoading) {
        return (
            <div className="flex flex-wrap gap-6">
                {(new Array(3)).fill(1).map((_, index) => {
                    return (<div className="w-52 h-40 rounded-xl overflow-hidden animate-pulse bg-gray bg-opacity-50" key={index}> </div>)
                })}
            </div>
        )
    }

    if (!article?.files?.length) {
        return null
    }

    return (
        <div>
            <div className="font-semibold mb-5">Изображения</div>
            <div className="flex flex-wrap gap-6">
                {article?.files.map((item) => (
                    <ImageLightBox key={item.id} src={item.src || ''}>
                        <div className="w-52 h-40 rounded-xl overflow-hidden bg-gray bg-opacity-10">
                            <img src={item.src} alt="" className='w-full h-full object-cover' />
                        </div>
                    </ImageLightBox>
                ))}
            </div>
        </div>
    );
}
