import { Box } from "@mui/material"
import Image from "next/image"

interface stickerLogoProps {
    rotate?: string
    width: number
    height: number
    responsive?: boolean
}

const StickerLogo = (props: stickerLogoProps) => {
return (
    <Box sx={{ 
        backgroundColor: 'white', 
        padding: '20px 40px 20px 40px', 
        borderRadius: '80px 80px 80px 0px', 
        width: props.responsive ? '100%' : 'fit-content', 
        rotate: props.rotate,
        position: props.responsive ? 'relative' : undefined,
        aspectRatio: props.responsive ? `${props.width}/${props.height}` : undefined,
    }}>
        {props.responsive ? (
            <Box sx={{ position: 'relative', width: '100%', height: '100%', padding: '16px', boxSizing: 'border-box' }}>
                <Image 
                    src="/logoBig.png" 
                    alt="logo" 
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="60vw"
                />
            </Box>
        ) : (
            <Image 
                src="/logoBig.png" 
                alt="logo" 
                width={props.width} 
                height={props.height}
            />
        )}
    </Box>
)
}

export default StickerLogo