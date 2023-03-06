import Background from '../components/UI/background/background'
import EmmaImage from '../components/UI/emma-image/emma-image'
import HeaderImage from '../components/UI/header-image/header-image'
import s from '../styles/home.module.scss'

export default function Home() {
  return (
    <>
      <HeaderImage />
      <Background />
      <h1 className={s.title}>THE JUST BY EMMA ETHOS</h1>
      <p className={s.description}>
        Our ethos is about producing naturally formulated products which focus on keeping your
        skincare routine natural and simple (with minimal wastage).
        <br />
        All products are handmade locally in small batches, in Leigh-on-Sea and our packaging is
        mainly glass and aluminium which can be fully recycled. Our face oil and face cream do
        include a pump/dropper, however this is necessary to keep the product fresh and avoid any
        contamination and for ease of use.
      </p>
      <EmmaImage />
      <h2>What our Customers Say</h2>
      <div>
        <div>Product 1</div>
        <div>Product 2</div>
        <div>Product 3</div>
        <div>Product 4</div>
      </div>

      <div className={s.box}>
        <p>
          No 1: Cleanse using the Nourishing Beauty Balm A gentle all purpose balm for cleansing and
          moisturising. Formulated using 100% natural, simple ingredients rich in antioxidants to
          help calm, balance, boost, nourish and give your skin a natural glow. Directions: To
          cleanse, warm a small amount in your hands and then massage, using circular motions, into
          dry skin for around 30 seconds to 1 minute, then gently remove with a warm cloth.
        </p>
        <p>
          No 2: Detox using the Detoxifying Face Mask A base powder detoxifying face mask with a
          light floral aroma and blend of vitamins and antioxidants. This mask will help draw out
          dirt and toxins to leave the skin clean and fresh with an even, smoother skin tone and
          balanced complexion. Directions: Mix one teaspoon of powder with approximately 1-2
          teaspoons of the following for each skin type until it forms a smooth paste: Oily Skin -
          Organic yogurt Normal/Combination Skin - Water or rose hydrosol (water) Dry/Sensitive Skin
          - Half water/half honey Use a brush to apply to freshly cleansed face and neck area
          (avoiding eyes). Rinse off with warm water after approximately 10 minutes.
        </p>
        <p>
          No 3: Moisturise using the Regenerating Face Cream A lightweight, non-greasy face cream,
          formulated with oils, extracts and hyaluronic acid to regenerate, balance, repair and
          improve your skin&apos;s elasticity, while helping prevent and reduce fine lines. Your
          skin will be left brightened and hydrated, leaving an even, smoother skin tone and
          balanced complexion. Directions: Apply a pea sized amount to your face and neck area.
        </p>
        <p>
          No 4: Nourish using Rejuvenating Facial Oil A light facial oil to help repair and
          rejuvenate damaged skin. Including oils rich in Omega 5 fatty acids and anti-aging
          properties to fend off free radicals. Formulated using 100% natural, simple ingredients
          rich in antioxidants to help calm, balance, boost, nourish, rejuvenate and revitalise your
          skin. Directions: Apply 3-4 drops to your face and neck area after you have applied face
          cream
        </p>
      </div>
      <button>Shop Now</button>
      <button>Sing up for 10% Discount and product reviews</button>
    </>
  )
}
