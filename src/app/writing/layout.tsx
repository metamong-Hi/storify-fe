export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return <section>
      	<div className="h-[92vh] bg-[#FAF3E0] w-full flex flex-col items-center  ">
      		<div className="w-full h-full flex  flex-col sm :flex-col md:flex-row lg:flex-row justify-center mt-5">
      			{	children }
      		</div>
      	</div>
    	</section>
  }