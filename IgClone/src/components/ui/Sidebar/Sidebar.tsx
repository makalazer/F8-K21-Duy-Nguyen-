import { Bookmark, LogOut, Menu, Plus } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { sidebarButton } from '@/utils/Constant';
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../menubar';
import { useMutation } from '@tanstack/react-query';
import { postLogout } from '@/services/auth.service';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';

function Sidebar() {
  const navigate = useNavigate();
  const mutationLogout = useMutation({
    mutationFn: postLogout,
    onError: (err) => {
      console.dir(err);
    },
    onSuccess: () => {
      navigate('/login');
    },
  });

  return (
    <aside className='h-screen fixed w-14 hover:w-56 transition-all duration-300 ease-in-out  bg-transparent overflow-hidden group flex flex-col justify-between  z-10  top-0 left-0 '>
      <img
        src='src/assets/instagram-logo-facebook-2-svgrepo-com.svg'
        alt=''
        className='w-14 p-2'
      />
      <nav className='w-full mx-2 flex flex-col gap-4'>
        <Dialog>
          {sidebarButton.map((item, index) => {
            const Icon = item.icon;
            return (
              <SidebarItem
                key={`sidebar-item-${index}`}
                label={item.label}
                link={item.link}
                icon={<Icon />}
              />
            );
          })}
          <DialogTrigger
            render={
              <button className='w-full text-left'>
                <SidebarItem
                  label={'Tạo'}
                  link={''}
                  icon={<Plus size={28} className='shrink-0 ' />}
                />
              </button>
            }
          />
          <DialogContent className='min-w-2xl'>
            <DialogHeader>
              <DialogTitle>Bài đăng mới</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className='flex items-center gap-2'>
              <div className='grid flex-1 gap-2'>
                <Field>
                  <FieldLabel htmlFor='caption'>Caption</FieldLabel>
                  <Input
                    id='caption'
                    type='text'
                    placeholder='Enter your caption'
                  />
                  <FieldDescription>
                    Choose a unique username for your account.
                  </FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor='picture'>Ảnh</FieldLabel>
                  <Input id='picture' type='file' />
                  <FieldDescription>Chọn ảnh để upload</FieldDescription>
                </Field>
              </div>
            </div>
            <DialogFooter className='sm:justify-start'>
              <Button variant={'outline'}>Submit</Button>
              <DialogClose render={<Button type='button'>Close</Button>} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </nav>
      <Menubar className={'border-0 w-full p-0 pb-2'}>
        <MenubarMenu>
          <MenubarTrigger>
            <Menu
              size={40}
              className='hover:bg-gray-800 w-14 py-2 rounded-xl'
            />
          </MenubarTrigger>
          <MenubarContent className='w-48'>
            <MenubarGroup>
              <MenubarItem className={'text-lg'}>
                <Bookmark size={48} />
                Bài viết đã lưu
              </MenubarItem>
              <MenubarItem
                className={'text-lg text-red-500'}
                onClick={() => {
                  mutationLogout.mutate();
                }}
              >
                <LogOut size={48} />
                Đăng xuất
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </aside>
  );
}

export default Sidebar;
