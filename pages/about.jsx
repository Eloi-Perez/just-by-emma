import Image from 'next/image'
import HeaderImage from '../components/UI/header-image/header-image'
import ByEmma from '../public/img/ByEmma.png'
import Link from 'next/link'
import EmmaImage from '../components/UI/emma-image/emma-image'
import SkinCareSection from '../components/skincare-routine/skincare-routine'
import { Button } from '../components/UI/button/button.styles'
import s from '../styles/home.module.scss'

export default function About() {
  return (
    <>
      <HeaderImage />
      <div className={'header_content'}>
        <div className={'header_text_container'}>
          <h1 className={'header_title'}>ABOUT</h1>
          <p className={'header_text'}>
            Just by Emma is a small independent skincare business based in Leigh-on-Sea, Essex and
            run by Emma. All products are lovingly handmade in my designated studio, in small
            batches and always made to order to maintain product quality. The ever-evolving skincare
            range includes products which are formulated using only natural and simple ingredients.
            <br />
            <br />
            The Just by Emma ethos is about formulating products which focus on making your skincare
            routine natural, simple and including ingredients which contain tremendous benefits for
            your skin.
            <br />
            <br />
            Ingredients are sourced from local suppliers where ever possible but always from
            reputable suppliers who have clear ethical policies.
            <br />
            <br />
            See our Ingredients page for more information....
            <br />
            <br />
            Just by Emma also believes in being completely transparent about each ingredient
            included in each product....
            <br />
            <br />
            So you can make informed decisions about what you are putting on your skin.
          </p>
        </div>
        <EmmaImage />
      </div>
      <div className={'story_content'}>
        <div className={'story_text_container'}>
          <h2 className={'story_title'}>MY STORY</h2>
          <p className={'story_text'}>
            It all started a few years back when I hit the age of 40 and my skin really started to
            change. Hormonal pimples, dry patches, oily patches... all of those things you thought
            you&apos;d left behind in your teens... All the products I used never seemed to help my
            sensitive skin or it created break-out or other sensitive reactions, I just got so
            confused about what I was putting on my skin and I never really knew what ingredients
            were right for my skin type.
            <br />
            <br />
            After experimenting using more natural product ranges, it led me to venture into a bit
            of a journey myself. I embarked on enrolling and completing some well regarded natural
            and organic skincare formulating courses and started studying, researching and having a
            go at formulating my own products.
            <br />
            <br />
            Crafting and using these simple formulations really helped to nourish and heal my skin.
            It also inspired me to create and share what is now known as Just by Emma.
            <br />
            <br />
            I&apos;ve kept it simple for now and have created a basic skincare range that uses
            gentle, natural, plant based oils, essential oils, extracts and some high performing
            botanical extracts too. All of which are formulated with the aim of helping to balance,
            nourish, hydrate, repair, regenerate and rejuvenate your skin. Just naturally and
            simply.
          </p>
        </div>
      </div>
      <h2 className="skincare_title">Skincare Routine in 4 Steps</h2>
      <div>
        <SkinCareSection />
      </div>
      <div className="about_button_container">
        <Image src={ByEmma} alt="By emma signature" />
        <Link href="/shop">
          <Button style={{ width: '390px', display: 'block', marginBottom: '20px;' }} primaryColor>
            Shop Now
          </Button>
        </Link>
        <Button style={{ width: '390px' }}>Sign up for 10% Discount</Button>
      </div>
    </>
  )
}
