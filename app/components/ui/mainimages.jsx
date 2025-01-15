 import { motion } from 'framer-motion'; // Corrected import

const ImagesMain = () => {
  return (
    <div className="mt-36 sm:mt-32 flex">
      {/* First Image */}
      <img
        src="/main1.png"
        alt=""
        width={70}
        height={70}
        className="w-8/12"
      />

       <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 4, 
          repeat: Infinity, 
          repeatType: 'loop',
        }}
        className=" -ml-[120px] mt-[130px] "
      >
        <img src="/main2.png" alt="" height={100} width={100} className='z-10'/>
      </motion.div>
    </div>
  );
};

export default ImagesMain;
