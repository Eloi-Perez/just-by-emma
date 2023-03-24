import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../components/UI/button/button.styles'
import EmmaImage from '../components/UI/emma-image/emma-image'
import HeaderImage from '../components/UI/header-image/header-image'
// import IngredientsSection from '../components/UI/skincare-routine/skincare-routine'
import SkinCareSection from '../components/skincare-routine/skincare-routine'

import FruitImage from '../public/img/fruits.png'
import ProductOne from '../public/img/product1.png'
import ProductTwo from '../public/img/product2.png'
import ProductThree from '../public/img/product3.png'
import CustomerOne from '../public/img/cu1.png'
import CustomerTwo from '../public/img/cu2.png'
import FiveStars from '../public/img/five_star.png'
import s from '../styles/home.module.scss'

export default function Home() {
  return (
    <>
      <HeaderImage />
      <div className={'header_content'}>
        <div className={'header_text_container'}>
          <h1 className={'header_title'}>THE JUST BY EMMA ETHOS</h1>
          <p className={'header_text'}>
            The Just by Emma ethos is about formulating products which focus on making your skincare routine natural, simple and including ingredients which contain tremendous benefits for your skin.<br />
            All products are handmade locally in small batches, in Leigh-on-Sea and our packaging is mainly glass and aluminium which can be fully recycled.<br />
            Ingredients are sourced from local suppliers wherever possible but always from reputable suppliers who have clear ethical policies.
          </p>
        </div>
        <EmmaImage />
      </div>
      <div>
        <div className={s.ingredientsContainer}>
          <div style={{ width: '850px', overflow: 'hidden' }}>
            <Image
              src={FruitImage}
              alt="fruits"
              style={{ width: '1000px', height: 'auto', opacity: '0.5' }}
            />
          </div>
          <div className={s.ingredientsTextContainer}>
            <h2 className={s.ingredientsHeader}>OUR INGREDIENTS</h2>
            <p className={s.ingredientsText}>
              Simple & Natural Oils, Butters, Botanical Extracts & Essential Oils.
            </p>
            <Link href="/ingredients">
              <Button style={{ margin: '150px auto', width: '410px' }}>Learn More</Button>
            </Link>
          </div>
        </div>
      </div>
      <h2 className={s.productsHeader}>INCREDIBLE PRODUCTS</h2>
      <div className={s.productsContainer}>
        <div className={s.productContainer}>
          <Image style={{ margin: '0 auto' }} src={ProductOne} alt="Rejuvenating Facial Oil" />
          <h2 className={s.productHeader}>Rejuvenating Facial Oil;</h2>
          <p className={s.productParagraph}>
            A light facial oil to help repair damaged skin, including Omega 5 fatty acids and
            anti-aging properties to fend of free radicals. Formulated using 100% natural, simple
            ingredients rich in antioxidants to help calm, balance, boost, nourish, rejuvenating and
            revitalising your skin
          </p>
        </div>
        <div className={s.productContainer}>
          <Image src={ProductTwo} alt="he Full Facial Gift Box" />
          <h2 className={s.productHeader}>The Full Facial Gift Box;</h2>
          <p className={s.productParagraph}>The gift box includes the following:</p>
          <p className={s.productParagraph}>
            Glass mask mixing bowl So Eco mask brush applicator Bamboo face cloth Wooden spoon (for
            the balm) The 4 Step Skincare Routine full sized products: Nourishing Beauty Balm 50ml
            Detoxifying Face Mask 20g Regenerating Face Cream 50ml Rejuvenating Facial Oil 50ml
            Information insert giving guidance on the &apos;4 step Skincare Routine&apos;
          </p>
        </div>
        <div className={s.productContainer}>
          <Image src={ProductThree} alt="The Mini Facial Gift Box" />
          <h2 className={s.productHeader}>The Mini Facial Gift Box;</h2>
          <p className={s.productParagraph}>
            Mini sized facial products. A facial in a box. Sample all four facial products in one
            handy gift box. Great for gifts. The gift box includes the following:
          </p>
          <p className={s.productParagraph}>
            Natural mini canvas draw string gift bag, Bamboo face cloth,Wooden spoon (for the balm)
            The 4 Step Skincare Routine mini sized products: Nourishing Beauty Balm 15ml Detoxifying
            Face Mask 5g Regenerating Face Cream 15ml Rejuvenating Facial Oil 10ml Information
            insert giving guidance on the &apos;4 step care Routine&apos;
          </p>
        </div>
      </div>
      <div className={s.buttonContainer}>
        <Link href="/shop">
          <Button style={{ width: '390px' }} primaryColor>
            Shop Now
          </Button>
        </Link>
        <Button style={{ width: '390px' }}>Sing up for 10% Discount</Button>
      </div>
      <h2 className={s.customersHeader}>What our Customers Say</h2>
      <div className={s.customersContainer}>
        <div className={s.reviewContainer}>
          <div className={s.infoContainer}>
            <Image src={CustomerOne} alt="customer profile" />
            <div>
              <p className={s.customerName}>Claire</p>
              <p className={s.customerRating}>
                5.0
                <span>
                  <Image src={FiveStars} alt="rating" />
                </span>
              </p>
            </div>
          </div>
          <p>
            The Orange and Coconut smell is AMAZING. Seriously smells good enough to eat. The pot
            lasts a really long time as the cream is nice and rich. Love it.
          </p>
        </div>
        <div className={s.reviewContainer}>
          <div className={s.infoContainer}>
            <Image src={CustomerTwo} alt="customer profile" />
            <div>
              <p className={s.customerName}>Claire</p>
              <p className={s.customerRating}>
                5.0
                <span>
                  <Image src={FiveStars} alt="rating" />
                </span>
              </p>
            </div>
          </div>
          <p>
            The Orange and Coconut smell is AMAZING. Seriously smells good enough to eat. The pot
            lasts a really long time as the cream is nice and rich. Love it.
          </p>
        </div>
      </div>
      <div className={s.reviewButton}>
        <Button style={{ width: '430px' }} primaryColor>
          More Reviews
        </Button>
      </div>
      <h2 style={{ fontSize: '2.5rem', marginBottom: '100px' }}>Skincare Routine in 4 Steps</h2>
      <SkinCareSection />
      <div className={s.buttonContainer}>
        <Link href="/shop">
          <Button style={{ width: '390px' }} primaryColor>
            Shop Now
          </Button>
        </Link>
        <Button style={{ width: '390px' }}>Sing up for 10% Discount</Button>
      </div>
    </>
  )
}
