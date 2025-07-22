import { useState } from "react";
import NoteContainer from "../../components/layouts/NoteContainer";
import DashboardView from "../../components/layouts/DashboardView";
import PaymentModal from "../../components/modals/PaymentModal";
import DashboardLayout from "../../components/layouts/DashboardLayout";
export default function NoteView() {
  const [count, setCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <DashboardLayout>
      <DashboardView searchVisible titleVisible firstContainer title="public notes" count={count} btnVisible={false}>
        <NoteContainer name="A" isPublic={true} paymentHandler={() => setModalOpen(true)}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt doloremque pariatur praesentium facilis minus delectus commodi officiis eaque explicabo sunt quae, ratione tenetur laborum tempore vitae voluptas animi sequi dolorum repudiandae aliquid.
        </NoteContainer>
        <NoteContainer name="A" isPublic={true}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in
          incidunt ex molestiae vitae, vero quod tempore dolor, iste
          voluptatibus nulla dolores sed illo assumenda. Quos id quasi velit
          facere sequi dolores!
        </NoteContainer>
        <NoteContainer name="A" isPublic={true}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in
          incidunt ex molestiae vitae, vero quod tempore dolor, iste
          voluptatibus nulla dolores sed illo assumenda. Quos id quasi velit
          facere sequi dolores!
        </NoteContainer>
        <NoteContainer name="A" isPublic={true}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in
          incidunt ex molestiae vitae, vero quod tempore dolor, iste
          voluptatibus nulla dolores sed illo assumenda. Quos id quasi velit
          facere sequi dolores!
        </NoteContainer>
        <NoteContainer name="A" isPublic={true}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta in
          incidunt ex molestiae vitae, vero quod tempore dolor, iste
          voluptatibus nulla dolores sed illo assumenda. Quos id quasi velit
          facere sequi dolores!
        </NoteContainer>

        <PaymentModal modalOpen={modalOpen} modalClose={() => setModalOpen(false)}></PaymentModal>
    </DashboardView>
    </DashboardLayout>
  );
}
