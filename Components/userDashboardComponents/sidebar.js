"use client"
import { ChevronRight, CurrencyIcon, HeartHandshake, Images, LayoutDashboard, Menu, Newspaper, PictureInPicture } from "lucide-react";
import Link from "next/link";
import "@/style/dashboard/sidebar.css"
import { useEffect, useState } from "react";
import CustomButton from "../common/CustomButton";
import { usePathname } from "next/navigation";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Sidebar() {
    const [isCollapse, setCollapse] = useState(false);
    const [ismobile, setmobile] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/user/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'News', href: '/user/news', icon: <Newspaper size={20} /> },
        { name: 'Donation', href: '/user/donation', icon: <HeartHandshake size={20} /> },
        { name: 'Expole', href: '/user/explore', icon: <Images size={20} /> }
    ];
    //Auto-collapse logic for small screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 576) {
                setmobile(true)
            }else{
                setmobile(false)
            }
            if (window.innerWidth < 768) {
                setCollapse(true);

            } else {
                setCollapse(false);
            }
        };

        // Set initial state based on current width
        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize); //what does thse 2 line means?

    }, []);
    return (

        <nav
            className={`sidebarBox vh-100 px-3 py-3 ${isCollapse ? "collapsed " : false} ${ismobile ? "formobile" : false}`}
            aria-label="Main Navigation"

        >
            <div className={`d-flex align-items-center ${isCollapse ? 'justify-content-center' : 'justify-content-between'} mb-4`}>
                {!isCollapse && <h5 className="m-0 fw-bold text-primary "><Link href="/" className="text-decoration-none">Bangladesh 2.0</Link></h5>}
                <CustomButton
                    onClick={() => setCollapse(!isCollapse)}
                    variant="transparent"
                    aria-expanded={!isCollapse}
                    aria-label="Toggle Sidebar"
                >
                    <Menu size={20} />
                </CustomButton>
            </div>

            <div className="d-flex flex-column align-items-stretch mt-4" >
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    const LinkContent = (
                        <Link
                            href={item.href}
                            className={`  sidebarlink mt-2 ${isActive ? "activelink" : " "}`}
                        >
                            <span className="me-2">{item.icon}</span>
                            {!isCollapse && <span>{item.name}</span>}
                            {!isCollapse && <ChevronRight size={14} opacity={0.5} className="Chevron" />}
                        </Link>
                    );

                    return isCollapse ? (
                        <OverlayTrigger key={item.href} placement="right" overlay={<Tooltip>{item.name}</Tooltip>}>
                            {LinkContent}

                        </OverlayTrigger>
                    ) : (
                        <div key={item.href}>{LinkContent}</div>
                    );
                }

                )}
            </div>
        </nav>
    );
}

// vh-100 = Viewport Height 100.
