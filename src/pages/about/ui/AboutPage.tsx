export function AboutPage() {
  return (
    <>
      <section className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-30 text-center pt-12">
        <header>
          <h1 className="text-4xl font-bold leading-tight mb-12">Welcome to Fetch my coin</h1>
          <p className="text-lg">
            Fetch my coin is a user-friendly cryptocurrency app that helps you stay up-to-date with the latest prices
            and trends in the crypto world.
          </p>
        </header>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center py-20">
            <h2 className="text-3xl font-bold leading-tight mb-12">Our Mission</h2>
            <p className="text-lg">
              At Fetch my coin, we are dedicated to providing a seamless experience for cryptocurrency enthusiasts like
              yourself. We believe that cryptocurrency is a powerful tool for individuals and businesses alike, and we
              strive to make it easy for everyone to access the latest information and stay up-to-date with the market.
            </p>
          </div>

          <div className="flex flex-col items-center py-20">
            <h2 className="text-3xl font-bold leading-tight mb-12">Features</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <li>
                <h3 className="text-xl font-bold leading-tight mb-2">Live updates</h3>
                Get instant access to current prices and trends in one click - tap ReFetch now button on the main page
                to update data
              </li>
              <li>
                <h3 className="text-xl font-bold leading-tight mb-2">Detailed information</h3>
                View all available data about each coin, including rate, ask price, bid price, and 24-hour price
                movement its types and versions on individual page - just click on coin icon in list on main page
              </li>
              <li>
                <h3 className="text-xl font-bold leading-tight mb-2">User-friendly interface</h3>
                Browse coins with ease and navigate through our intuitive app, switch between different coins, use
                different coins as base for rate. Use our app in day or night - theme switcher accessible in header
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center py-20">
            <h2 className="text-3xl font-bold leading-tight mb-12">How it Works</h2>
            <p>
              Simply visit our website or mobile app, select the cryptocurrency you are interested in, and get instant
              access to its current rates relative to USD.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
