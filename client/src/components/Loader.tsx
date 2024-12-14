import '@/app/loader.css'

export default function Loader() {
    return <div className="min-h-[clac(100vh-80px)] flex flex-col items-center justify-center">
        <div className="loader">
            <div className="square" id="sq1"></div>
            <div className="square" id="sq2"></div>
            <div className="square" id="sq3"></div>
            <div className="square" id="sq4"></div>
            <div className="square" id="sq5"></div>
            <div className="square" id="sq6"></div>
            <div className="square" id="sq7"></div>
            <div className="square" id="sq8"></div>
            <div className="square" id="sq9"></div>
        </div>
    </div>
}