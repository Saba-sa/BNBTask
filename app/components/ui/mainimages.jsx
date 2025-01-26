import { motion } from 'framer-motion';

const ImagesMain = () => {
  return (
    <div className="mt-36 sm:mt-32 flex">
      {/* First Image */}
      <img
        src="/main1.png"
        alt="Main Image 1"
        width={70}
        height={70}
        className="w-8/12"
        onError={(e) => {
          e.target.src = '/fallback-image.png'; // Fallback image if main1.png fails to load
        }}
      />

      {/* Animated Second Image */}
      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'loop',
        }}
        className="-ml-[120px] mt-[130px]"
      >
        <img
          src="/main2.png"
          alt="Main Image 2"
          height={100}
          width={100}
          className="z-10"
          onError={(e) => {
            e.target.src = '/fallback-image.png'; // Fallback image if main2.png fails to load
          }}
        />
      </motion.div>
    </div>
  );
};

export default ImagesMain;