import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../components/UI/button/button.styles'
import EmmaImage from '../components/UI/emma-image/emma-image'
import HeaderImage from '../components/UI/header-image/header-image'
import SkinCareSection from '../components/skincare-routine/skincare-routine'
import FruitImage from '../public/img/fruit.png'
import ProductOne from '../public/img/product1.jpg'
import ProductTwo from '../public/img/product2.jpg'
import ProductThree from '../public/img/product3.jpg'
import CustomerOne from '../public/img/cu1.png'
import CustomerTwo from '../public/img/cu2.png'
import FiveStars from '../public/img/five_star.png'
import ByEmma from '../public/img/ByEmma.png'
import s from '../styles/home.module.scss'

export default function Home() {
  return (
    <>
      <HeaderImage />
      <div className={'header_content'}>
        <div className={'header_text_container'}>
          <h1 className={'header_title'}>THE JUST BY EMMA ETHOS</h1>
          <p className={'header_text'}>
            The Just by Emma ethos is about formulating products which focus on making your skincare
            routine natural, simple and including ingredients which contain tremendous benefits for
            your skin.
            <br />
            All products are handmade locally in small batches, in Leigh-on-Sea and our packaging is
            mainly glass and aluminium which can be fully recycled.
            <br />
            Ingredients are sourced from local suppliers wherever possible but always from reputable
            suppliers who have clear ethical policies.
          </p>
        </div>
        <EmmaImage />
      </div>
      <div className={s.mobile_element_reorder}>
        <div style={{ marginBottom: '50px' }}>
          <h2 className={s.header}>INCREDIBLE PRODUCTS</h2>
          <div className={s.products_container}>
            <div className={s.product_container}>
              <Image
                src={ProductOne}
                className={s.image}
                alt="Rejuvenating Facial Oil"
                placeholder="blur"
              />
              <h2 className={s.product_header}>Rejuvenating Facial Oil;</h2>
              <p className={s.product_paragraph}>
                A light facial oil to help repair damaged skin, including Omega 5 fatty acids and
                anti-aging properties to fend of free radicals. Formulated using 100% natural,
                simple ingredients rich in antioxidants to help calm, balance, boost, nourish,
                rejuvenating and revitalising your skin
              </p>
            </div>
            <div className={s.product_container}>
              <Image
                src={ProductTwo}
                className={s.image}
                alt="Full Facial Gift Box"
                placeholder="blur"
              />
              <h2 className={s.product_header}>The Full Facial Gift Box;</h2>
              <p className={s.product_paragraph}>The gift box includes the following:</p>
              <p className={s.product_paragraph}>
                Glass mask mixing bowl So Eco mask brush applicator Bamboo face cloth Wooden spoon
                (for the balm) The 4 Step Skincare Routine full sized products: Nourishing Beauty
                Balm 50ml Detoxifying Face Mask 20g Regenerating Face Cream 50ml Rejuvenating Facial
                Oil 50ml Information insert giving guidance on the &apos;4 step Skincare
                Routine&apos;
              </p>
            </div>
            <div className={s.product_container}>
              <Image
                src={ProductThree}
                className={s.image}
                alt="The Mini Facial Gift Box"
                placeholder="blur"
              />
              <h2 className={s.product_header}>The Mini Facial Gift Box;</h2>
              <p className={s.product_paragraph}>
                Mini sized facial products. A facial in a box. Sample all four facial products in
                one handy gift box. Great for gifts. The gift box includes the following:
              </p>
              <p className={s.product_paragraph}>
                Natural mini canvas draw string gift bag, Bamboo face cloth,Wooden spoon (for the
                balm) The 4 Step Skincare Routine mini sized products: Nourishing Beauty Balm 15ml
                Detoxifying Face Mask 5g Regenerating Face Cream 15ml Rejuvenating Facial Oil 10ml
                Information insert giving guidance on the &apos;4 step care Routine&apos;
              </p>
            </div>
          </div>
        </div>
        <div className={s.button_container}>
          <Link href="/shop">
            <Button primaryColor>Shop Now</Button>
          </Link>
          <Button>Sign up for 10% Discount</Button>
        </div>
        <div className={s.container}>
          <div className={s.ingredients_text_container}>
            <h2 className={s.header}>OUR INGREDIENTS</h2>
            <p className={s.ingredients_text}>
              Our Ingredients Are a Selection of Simple & Natural Oils, Butters, Botanical Extracts
              & Essential Oils. Tailored To Each individual Product
            </p>
            <Link href="/ingredients">
              <Button className={s.ingredients_button} style={{ fontSize: '1.5rem' }}>
                Learn More
              </Button>
            </Link>
          </div>
          <Image
            className={s.fruits_image}
            src={FruitImage}
            alt="fruits"
            placeholder="blur"
            priority
          />
        </div>
      </div>
      <h2 className={s.customers_header}>WHAT OUR CUSTOMERS SAY</h2>
      <div className={s.customers_container}>
        <div className={s.review_container}>
          <div className={s.info_container}>
            <Image src={CustomerOne} alt="customer profile" placeholder="blur" />
            <div>
              <p className={s.customer_name}>Claire</p>
              <p className={s.customer_rating}>
                5.0
                <span>
                  <Image className={s.five_stars} src={FiveStars} alt="rating" placeholder="blur" />
                </span>
              </p>
            </div>
          </div>
          <p>
            The Orange and Coconut smell is AMAZING. Seriously smells good enough to eat. The pot
            lasts a really long time as the cream is nice and rich. Love it.
          </p>
        </div>
        <div className={s.review_container}>
          <div className={s.info_container}>
            <Image src={CustomerTwo} alt="customer profile" placeholder="blur" />
            <div>
              <p className={s.customer_name}>Claire</p>
              <p className={s.customer_rating}>
                5.0
                <span>
                  <Image className={s.five_stars} src={FiveStars} alt="rating" placeholder="blur" />
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
      <div className={s.review_button}>
        <Button primaryColor>More Reviews</Button>
      </div>
      <h2 className={s.header}>Skincare Routine in 4 Steps</h2>
      <SkinCareSection />
      <div className={s.signature_image_container}>
        <Image className={s.signature_image} src={ByEmma} alt="Emma signature" />
      </div>
      <div className={s.signature_button_container}>
        <Link href="/shop">
          <Button primaryColor>Shop Now</Button>
        </Link>
        <Button>Sign up for 10% Discount</Button>
      </div>
    </>
  )
}
