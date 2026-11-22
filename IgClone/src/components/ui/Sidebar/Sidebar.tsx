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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import useSidebarAction from '@/components/ui/Sidebar/hooks/useSidebarAction';

function Sidebar() {
  const {
    submitPost,
    logout,
    setCaption,
    setSelectedFile,
    setPreviewURL,
    setFileType,
    setOpenCreatePostDialog,
    selectedFile,
    previewURL,
    caption,
    fileType,
    openCreatePostDialog,
  } = useSidebarAction();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewURL(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewURL(objectUrl);
    if (selectedFile.type.startsWith('image/')) {
      setFileType('image');
    }
    if (selectedFile.type.startsWith('video/')) {
      setFileType('video');
    }

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);

  console.log(selectedFile);
  console.log(previewURL);
  console.log(logout);
  return (
    <aside className='h-screen fixed w-14 hover:w-56 transition-all duration-300 ease-in-out  bg-transparent overflow-hidden group flex flex-col justify-between  z-10  top-0 left-0 '>
      <img
        src='src/assets/instagram-logo-facebook-2-svgrepo-com.svg'
        alt=''
        className='w-14 p-2'
      />
      <nav className='w-full mx-2 flex flex-col gap-4'>
        <Dialog
          open={openCreatePostDialog}
          onOpenChange={setOpenCreatePostDialog}
        >
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
          <DialogContent className='min-w-4xl min-h-[80%]'>
            <div className='flex flex-col gap-6 w-full justify-between '>
              <DialogHeader>
                <DialogTitle className={'text-center w-full text-xl font-bold'}>
                  Bài đăng mới
                </DialogTitle>
              </DialogHeader>
              <div className='flex items-center gap-2 justify-between flex-col flex-1 '>
                <Field>
                  <FieldLabel
                    htmlFor='caption'
                    className='w-full justify-center text-center py-1 text-lg'
                  >
                    Caption
                  </FieldLabel>
                  <Input
                    id='caption'
                    type='text'
                    placeholder='Enter your caption'
                    onChange={handleCaptionChange}
                    value={caption}
                    className='max-w-4/5 text-center py-4 m-auto'
                  />
                </Field>
                <div className='w-full flex justify-end flex-1'>
                  <div className='max-w-4/5 mx-auto max-h-full flex flex-col justify-between items-center gap-4 text-center flex-1'>
                    {previewURL && fileType === 'image' && (
                      <img
                        src={previewURL}
                        className='w-full rounded-xl flex-1'
                      />
                    )}
                    {previewURL && fileType === 'video' && (
                      <video
                        src={previewURL}
                        className='w-full rounded-xl flex-1'
                      />
                    )}
                    <Field>
                      <label
                        htmlFor='picture'
                        className='cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg align-middle'
                      >
                        Chọn ảnh
                        <Input
                          id='picture'
                          type='file'
                          className='hidden'
                          onChange={handleFileChange}
                        />
                      </label>
                    </Field>
                  </div>
                </div>
              </div>
              <DialogFooter className='sm:justify-start p-2'>
                <div className='flex justify-center w-full'>
                  <Button
                    className='cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-3'
                    onClick={() => {
                      if (selectedFile && caption) {
                        submitPost({ caption, file: selectedFile });
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </DialogFooter>
            </div>
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
                  console.log('logout');
                  logout();
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
