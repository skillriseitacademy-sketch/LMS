import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mockup/pro_checkout_secure_payment")({
  component: ProCheckoutSecurePaymentPage,
});

function ProCheckoutSecurePaymentPage() {
  return (
    <>
      <header className="bg-surface dark:bg-on-surface shadow-sm sticky docked full-width top-0 z-50">
        <div className="flex justify-between items-center w-full px-lg py-sm max-w-container-max mx-auto">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim tracking-tight">
              PlacePro Pro
            </span>
          </div>
          <div className="flex items-center gap-md">
            <button className="p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant hover:text-primary duration-200">
              <span className="material-symbols-outlined">help</span>
            </button>
            <button className="p-2 rounded-full hover:bg-surface-variant transition-colors text-on-surface-variant hover:text-primary duration-200">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-container-max mx-auto px-md lg:px-xl py-xl">
        <div className="mb-xl flex items-center justify-between">
          <h1 className="font-headline-lg text-headline-lg text-on-surface">Secure Checkout</h1>
          <div className="hidden md:flex items-center gap-2 text-on-surface-variant bg-surface-container-low px-4 py-2 rounded-full">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span className="font-label-sm text-label-sm">256-bit SSL Encrypted</span>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl items-start">
          <div className="lg:col-span-7 space-y-lg">
            <section className="bg-surface-container-lowest rounded-xl p-lg custom-shadow border border-surface-container-low relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">credit_card</span>
                Payment Method
              </h2>
              <div className="space-y-md">
                <div className="grid grid-cols-2 gap-sm mb-md">
                  <label className="cursor-pointer">
                    <input checked="" className="peer sr-only" name="payment_method" type="radio" />
                    <div className="rounded-lg border-2 border-primary bg-surface-container-low p-4 flex items-center gap-3 peer-checked:bg-surface-container-high transition-colors">
                      <span className="material-symbols-outlined text-primary">credit_card</span>
                      <span className="font-medium text-on-surface">Credit / Debit Card</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input className="peer sr-only" name="payment_method" type="radio" />
                    <div className="rounded-lg border-2 border-transparent bg-surface-container p-4 flex items-center gap-3 peer-checked:border-primary peer-checked:bg-surface-container-high transition-colors hover:bg-surface-variant">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        account_balance
                      </span>
                      <span className="font-medium text-on-surface-variant">Net Banking / UPI</span>
                    </div>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                      htmlFor="card_name"
                    >
                      Name on Card
                    </label>
                    <input
                      className="w-full rounded-lg border border-outline-variant bg-surface-bright px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                      id="card_name"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                      htmlFor="card_number"
                    >
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-bright px-4 py-3 pl-10 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                        id="card_number"
                        placeholder="0000 0000 0000 0000"
                        type="text"
                      />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                        credit_card
                      </span>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <div className="w-8 h-5 bg-surface-container rounded"></div>
                        <div className="w-8 h-5 bg-surface-container rounded"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-md">
                    <div>
                      <label
                        className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                        htmlFor="expiry"
                      >
                        Expiry Date
                      </label>
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-bright px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                        id="expiry"
                        placeholder="MM / YY"
                        type="text"
                      />
                    </div>
                    <div>
                      <label
                        className="block font-label-sm text-label-sm text-on-surface-variant mb-1 flex items-center gap-1"
                        htmlFor="cvv"
                      >
                        CVV
                        <span
                          className="material-symbols-outlined text-[14px] cursor-help"
                          title="3 or 4 digit code on the back of your card"
                        >
                          info
                        </span>
                      </label>
                      <input
                        className="w-full rounded-lg border border-outline-variant bg-surface-bright px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                        id="cvv"
                        maxlength="4"
                        placeholder="•••"
                        type="password"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-surface-container">
                  <input
                    checked=""
                    className="rounded text-primary focus:ring-primary w-5 h-5 border-outline-variant bg-surface-bright cursor-pointer"
                    id="save_card"
                    type="checkbox"
                  />
                  <label className="text-on-surface-variant cursor-pointer" htmlFor="save_card">
                    Save this card for future billing
                  </label>
                </div>
              </div>
            </section>

            <section className="bg-surface-container-lowest rounded-xl p-lg custom-shadow border border-surface-container-low">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant">
                  location_on
                </span>
                Billing Address
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label
                    className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                    htmlFor="address_line1"
                  >
                    Address Line 1
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant bg-surface-bright px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                    id="address_line1"
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                    htmlFor="city"
                  >
                    City
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant bg-surface-bright px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                    id="city"
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="block font-label-sm text-label-sm text-on-surface-variant mb-1"
                    htmlFor="postal_code"
                  >
                    Postal Code
                  </label>
                  <input
                    className="w-full rounded-lg border border-outline-variant bg-surface-bright px-4 py-3 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                    id="postal_code"
                    type="text"
                  />
                </div>
              </div>
            </section>
          </div>

          <div className="lg:col-span-5 space-y-lg">
            <section className="bg-surface-container-lowest rounded-xl p-lg custom-shadow border border-surface-container-low relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-secondary-container/20 rounded-2xl blur-lg -z-10 opacity-50"></div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-md">
                Order Summary
              </h2>

              <div className="bg-surface-container-low rounded-lg p-4 mb-lg border border-surface-variant flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-on-surface">PlacePro Pro</span>
                    <span className="bg-secondary-container text-on-secondary-container text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Annual
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant">Billed yearly. Cancel anytime.</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-on-surface text-lg">₹2,999</span>
                  <div className="text-xs text-on-surface-variant line-through">₹5,999</div>
                </div>
              </div>

              <div className="mb-lg flex gap-2">
                <input
                  className="flex-grow rounded-lg border border-outline-variant bg-surface-bright px-4 py-2 text-on-surface focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-shadow"
                  placeholder="Promo Code"
                  type="text"
                />
                <button className="px-4 py-2 bg-surface-variant text-on-surface font-medium rounded-lg hover:bg-surface-dim transition-colors">
                  Apply
                </button>
              </div>

              <div className="space-y-3 mb-xl">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>₹2,999</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span>Taxes (18% GST)</span>
                  <span>₹540</span>
                </div>
                <div className="h-px w-full bg-surface-variant my-2"></div>
                <div className="flex justify-between items-end">
                  <span className="font-bold text-on-surface">Total Due Today</span>
                  <div className="text-right">
                    <span className="font-headline-md text-headline-md font-bold text-primary">
                      ₹3,539
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-primary text-on-primary py-4 rounded-lg font-bold text-lg hover:bg-primary-fixed-variant transition-all hover:scale-[1.02] shadow-md flex justify-center items-center gap-2 group">
                <span className="material-symbols-outlined text-[20px] group-hover:animate-pulse">
                  lock
                </span>
                Complete Purchase
              </button>
              <p className="text-center text-xs text-on-surface-variant mt-3">
                By purchasing, you agree to our Terms of Service &amp; Privacy Policy.
              </p>
            </section>

            <section className="bg-surface-container-lowest rounded-xl p-lg custom-shadow border border-surface-container-low">
              <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-secondary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  stars
                </span>
                What you're unlocking
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-primary-container/20 p-2 rounded-lg mt-0.5">
                    <span className="material-symbols-outlined text-primary text-sm">
                      auto_awesome
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface text-sm">
                      AI Resume Optimization
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      Get past ATS filters with tailored keywords.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary-container/20 p-2 rounded-lg mt-0.5">
                    <span className="material-symbols-outlined text-primary text-sm">
                      record_voice_over
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface text-sm">
                      Unlimited Mock Interviews
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      Practice with industry-specific AI interviewers.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-secondary-container/20 p-2 rounded-lg mt-0.5">
                    <span className="material-symbols-outlined text-secondary-container text-sm">
                      workspace_premium
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface text-sm">Premium Arena Access</h4>
                    <p className="text-sm text-on-surface-variant">
                      Compete in high-stakes coding challenges.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary-container/20 p-2 rounded-lg mt-0.5">
                    <span className="material-symbols-outlined text-primary text-sm">forum</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-on-surface text-sm">
                      Direct Recruiter Messages
                    </h4>
                    <p className="text-sm text-on-surface-variant">
                      Skip the line and message hiring managers directly.
                    </p>
                  </div>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
