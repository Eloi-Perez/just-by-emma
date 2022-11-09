import HeaderImage from '../components/UI/header-image/header-image'
import s from '../styles/home.module.scss'

export default function About() {
  return (
    <div className={s.root}>
      <HeaderImage />
      <h1 className={s.title}>ABOUT</h1>
      <p className={s.description}>
        Just by Emma is a small independent skincare business based in Leigh-on-Sea, Essex and run by Emma. All products are lovingly handmade in my designated studio, in small batches and always made to order to maintain product quality. The ever-evolving skincare range includes products which are formulated using only natural and simple ingredients.<br />
        The Just by Emma ethos is about formulating products which focus on making your skincare routine natural, simple and including ingredients which contain tremendous benefits for your skin.<br />
        Ingredients are sourced from local suppliers where ever possible but always from reputable suppliers who have clear ethical policies.<br />
        See our 'Ingredients' page for more information....<br />
        Just by Emma also believes in being completely transparent about each ingredient included in each product....<br />
        So you can make informed decisions about what you are putting on your skin. 
      </p>
      <h2>MY STORY</h2>
      <p>
        It all started a few years back when I hit the age of 40 and my skin really started to change. Hormonal pimples, dry patches, oily patches... all of those things you thought you'd left behind in your teens...  All the products I used never seemed to help my sensitive skin or it created break-out or other sensitive reactions, I just got so confused about what I was putting on my skin and I never really knew what ingredients were right for my skin type.<br />
        After experimenting using more natural product ranges, it led me to venture into a bit of a journey myself.  I embarked on enrolling and completing some well regarded natural and organic skincare formulating courses and started studying, researching and having a go at formulating my own products.<br />
        Crafting and using these simple formulations really helped to nourish and heal my skin. It also inspired me to create and share what is now known as Just by Emma.<br />
        I've kept it simple for now and have created a basic skincare range that uses gentle, natural, plant based oils, essential oils, extracts and some high performing botanical extracts too.  All of which are formulated with the aim of helping to balance, nourish, hydrate, repair, regenerate and rejuvenate your skin.  Just naturally and simply.
        </p>
      <div className={s.box}>
        <h2>The Just by Emma 4 Step Skincare Routine</h2>
        <p>
          No 1: Cleanse using the Nourishing Beauty Balm
          A gentle all purpose balm for cleansing and moisturising. Formulated using 100% natural, simple ingredients rich in antioxidants to help calm, balance, boost, nourish and give your skin a natural glow.<br />
          Directions:<br />
          To cleanse, warm a small amount in your hands and then massage, using circular motions, into dry skin for around 30 seconds to 1 minute, then gently remove with a warm cloth.<br />
          No 2: Detox using the Detoxifying Face Mask<br />
          A base powder detoxifying face mask with a light floral aroma and blend of vitamins and antioxidants. This mask will help draw out dirt and toxins to leave the skin clean and fresh with an even, smoother skin tone and balanced complexion.<br />
          Directions:<br />
          Mix one teaspoon of powder with approximately 1-2 teaspoons of the following for each skin type until it forms a smooth paste:<br />
          Oily Skin - Organic yogurt<br />
          Normal/Combination Skin - Water or rose hydrosol (water)<br />
          Dry/Sensitive Skin - Half water/half honey<br />
          Use a brush to apply to freshly cleansed face and neck area (avoiding eyes). Rinse off with warm water after approximately 10 minutes.<br />
          No 3: Moisturise using the Regenerating Face Cream<br />
          A lightweight, non-greasy face cream, formulated with oils, extracts and hyaluronic acid to regenerate, balance, repair and improve
          your skin's elasticity, while helping prevent and reduce fine lines. Your skin will be left brightened and hydrated, leaving an even,
          smoother skin tone and balanced complexion.<br />
          Directions:<br />
          Apply a pea sized amount to your face and neck area.<br />
          No 4: Nourish using Rejuvenating Facial Oil<br />
          A light facial oil to help repair and rejuvenate damaged skin. Including oils rich in Omega 5 fatty acids and anti-aging properties
          to fend off free radicals. Formulated using 100% natural, simple ingredients rich in antioxidants to help calm, balance, boost,
          nourish, rejuvenate and revitalise your skin.<br />
          Directions:<br />
          Apply 3-4 drops to your face and neck area after you have applied face cream.
        </p>
      </div>
      <button>Shop Now</button>
      <button>Sing up for 10% Discount and product reviews</button>
    </div>
  )
}
