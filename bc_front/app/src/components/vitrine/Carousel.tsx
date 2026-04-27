import { ImageListItem } from "@mui/material"
import ImageList from '@mui/material/ImageList';
import theme from "@/theme";
const images = [
    {
        src: '/logos/banana-logo.jpg',
        alt: 'logo'
    },
    {
        src: '/logos/ekod.png',
        alt: 'logo'
    },
    {
        src: '/logos/logo-vectoriel-renault-group.jpg',
        alt: 'logo'
    },
    {
        src: '/logos/stmicro-logo.png',
        alt: 'logo'
    },
]

const Carousel = () => {
    return (
        <ImageList cols={images.length} rowHeight={160} sx={{ gridAutoFlow: "column", overflowX: "auto", overflowY: "hidden", backgroundColor: theme.palette.background.grey, marginTop:'50px' }}>
            {images.map((image) => (
                <ImageListItem key={image.src} sx={{ width: 180 }}>
                    <img src={image.src} alt={image.alt} loading="lazy" style={{ objectFit: "contain", height: 160 }} />
                </ImageListItem>
            ))}
        </ImageList>
    )
}

export default Carousel