import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

function Nav() {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <div className="navigation-body">
      <ul>
        <li className={router.pathname === '/' ? 'active' : ''}>
          <Link href="/"><span>HOME</span></Link>
        </li>
        <li className={router.pathname === '/about' ? 'active' : ''}>
          <Link href="/about"><span>ABOUT</span></Link>
        </li>
        <li className={router.pathname === '/resume' ? 'active' : ''}>
          <Link href="/resume"><span>RESUME</span></Link>
        </li>
        <li className={router.pathname === '/contact' ? 'active' : ''}>
          <Link href="/contact"><span>CONTACT</span></Link>
        </li>
      </ul>
      <style jsx>
        {`
          .navigation-body {
            font-size: 12px;
            list-style-type: none;
            position: fixed;
            right: 2.0833vw;
            top: 30px;
            text-align: right;
            line-height: 18px;
            font-family: 'Nunito';
            z-index: 10000;
          }

          .navigation-body span:hover {
            color: #09e6c4;
          }

          li.active {
            font-weight: bold;
          }

          ul {
            list-style: none;
          }
        `}
      </style>
    </div>
  );
}

export default Nav;
