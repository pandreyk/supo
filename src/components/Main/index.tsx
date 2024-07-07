import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../supabaseClient';

const getOrganizationData = async () => {
    const { data } = await supabase.from('organization').select(`
      id,
      name,
      kindOfSports (
        id, name,
        discipline (id, name)
      ),
      sportsman (id, name)
    `);

    return data;
};

export const Main = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['organization'],
        queryFn: getOrganizationData
    });

    if (isPending) return 'Loading...';

    if (error) return 'An error has occurred: ' + error.message;

    return <pre>{JSON.stringify(data, null, 4)}</pre>;
};
