export default function ChairmanMessage() {
  return (
    <div className="bg-white mt-5 py-12 px-6 md:px-16 flex flex-col md:flex-row items-center gap-10 max-w-7xl mx-auto">
      {/* Left: Image */}
      <div className="flex-shrink-0">
        <img
          src="https://stgaccinwbsdevlrs01.blob.core.windows.net/newcorporatewbsite/homepage-details/February2024/mw4evrcLurpN0TMv6hsA.webp?w=640&q=75" // 
          alt="Chairman"
          className="w-full max-w-xs md:max-w-sm object-contain"
        />
      </div>

      {/* Right: Text */}
      <div className="text-gray-800 max-w-2xl">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Message From Our Chairman
        </h2>
        <p className="mb-4">
          Back in the day, we realised that just as innovation in medical
          science is elementary to the growth of healthcare, we need to bring
          innovation in how we take quality healthcare to everyone.
        </p>
        <p className="mb-4">
          We realised that it is not merely a transaction of health services
          between a patient and doctor. It is trust that fosters a healthy
          relationship in the journey of health.
        </p>
        <p className="mb-4">
          As we move with the times, we realise that technology has a huge role
          in making our services way more efficient. And by its application, way
          more human as well.
        </p>
        <p className="mb-4">
          We have a dream. Our dream is to be available to you round the clock,
          wherever you are and whenever you want. We want to be just one tap
          away from you, and this will be the beginning of consumer-centric
          healthcare.
        </p>

        <p className="mt-6 font-semibold">Take Care</p>
        <h3 className="text-xl font-bold mt-1">Dr. Devi Prasad Shetty</h3>
        <p className="text-sm font-medium text-gray-600">
          Founder and Chairman
        </p>
      </div>
    </div>
  );
}
