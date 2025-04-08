import Image from "next/image";




export default function AtemuInfo() {
    return (
        <section className="flex items-center w-full h-[830px] bg-[#000] px-10">
            <div className="w-[60%] md:pt-80 px-10">
                <p className="text-left text-[24px] md:text-[36px] font-space">Atemu OG is the first Card Collection on Atemu. </p>
                <p className="text-left text-[12px] md:text-[15px] font-space mt-10">Coming  with limted supply and will not be restock.</p>
                <div className="flex items-center mt-10">
                    <Image src="/Caster.png" width={98} height={186} alt="caster" />
                    <Image src="/Dragon.png" width={98} height={186} alt="dragon" />
                    <Image src="/Hell Born.png" width={98} height={186} alt="hell born"/>
                    <Image src="/Warrior.png" width={98} height={186} alt="warrior"/>
                    <Image src="/Legend.png" width={98} height={186} alt="legend"/>
                </div>
            </div>

            <div className="w-[40%]">
                <Image src="/apollo.png" width={6405} height={8906} alt="apollo" />
            </div>
            
        </section>
    );
}