export default function Footer(){
  return (
    <>
      <footer className="mt-10 p-6 text-center text-sm text-gray-600">© {new Date().getFullYear()} HomeMate</footer>
      <div className="fixed left-4 bottom-4 text-xs text-gray-700 flex items-center">
        <span className="mr-2">made with</span>
        <span className="text-red-500">♥</span>
        <span className="ml-2">by Moksh</span>
      </div>
    </>
  );
}
