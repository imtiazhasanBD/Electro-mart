import "react-multi-carousel/lib/styles.css";

const getResponsiveConfig = ({category}) => {
    
    return {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: (category === "furniture" || category === "laptops") ? 5 : 6,
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: (category === "furniture" || category === "laptops") ? 5 : 6,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3,
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: (category === "groceries")? 3 : 1,
        },
      };
}

export default getResponsiveConfig
