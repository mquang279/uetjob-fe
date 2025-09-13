import { Carousel } from 'antd';
import { useState, useMemo } from 'react';
import useListAllFiles from '../../hooks/storage/useListsAllFiles';

const ADS_CONFIG = {
    baseUrl: 'http://localhost:9000/uetjob',
    adsPerSlide: 3,
    carouselSettings: {
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true,
        arrows: false,
    }
};

const chunkArray = (array, size) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }
    return chunks;
};

const AdImage = ({ ad }) => {
    const [imageError, setImageError] = useState(false);

    if (imageError) {
        return (
            <div className="w-1/4 h-32 flex-shrink-0 rounded-lg bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">Image not available</span>
            </div>
        );
    }

    return (
        <img
            src={`${ADS_CONFIG.baseUrl}/${ad.src}`}
            alt={ad.alt}
            title={ad.title}
            className="w-1/4 h-auto flex-shrink-0 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onError={() => setImageError(true)}
        />
    );
};

const CarouselSlide = ({ ads, onImageError }) => (
    <div>
        <div className="flex justify-center items-center gap-16 py-8 flex-wrap">
            {ads.map((ad) => (
                <AdImage
                    key={ad.id}
                    ad={ad}
                    onError={onImageError}
                />
            ))}
        </div>
    </div>
);

const AdsDisplay = ({ className = '' }) => {
    const { data: filesData, isLoading, isError } = useListAllFiles('ads');

    const adsData = useMemo(() => {
        if (!filesData || !Array.isArray(filesData)) {
            return [];
        }

        return filesData.map((fileName, index) => ({
            id: index + 1,
            src: fileName,
            alt: `Job Advertisement ${index + 1}`,
            title: `Advertisement ${index + 1}`
        }));
    }, [filesData])

    const adSlides = chunkArray(adsData, ADS_CONFIG.adsPerSlide);

    if (isLoading) {
        return (
            <div className={`ads-display py-2 bg-white ${className}`}>
                <div className="flex justify-center items-center py-8">
                    <span className="text-gray-500">Loading advertisements...</span>
                </div>
            </div>
        )
    }

    if (isError || adsData.length === 0) {
        return (
            <></>
        )
    }

    return (
        <div className={`ads-display py-2 bg-white ${className}`}>
            <Carousel {...ADS_CONFIG.carouselSettings}>
                {adSlides.map((slideAds, index) => (
                    <CarouselSlide
                        key={index}
                        ads={slideAds}
                    />
                ))}
            </Carousel>
        </div>
    )
}

export default AdsDisplay