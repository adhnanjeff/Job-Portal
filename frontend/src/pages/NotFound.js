import { Box } from '@mui/material'
import React from 'react'
import Footer from '../component/Footer'
import Navbar from '../component/Navbar'

const NotFound = () => {
    return (
        <>
            <Navbar />
            <Box 
                sx={{ 
                    height: '81vh', 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center" 
                }}
            >
                <Box
                    component="img"
                    src='./../'
                    alt="Page not found"
                    sx={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%' 
                    }}
                />
            </Box>
            <Footer />
        </>
    )
}

export default NotFound
